import { createContext, useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const AuthContext = createContext();
// AuthProvider 컴포넌트 정의 (자식 컴포넌트를 감싸서 인증 정보 제공)
export const AuthProvider = ({ children }) => {
  // auth 선언과 변경함수 setAuth 선언
  const [auth, setAuth] = useState(null);
  useEffect(() => {
    const loadAuth = async () => {
        // AsyncStorage.getItem에 인증정보를 storedAuth에 할당
      const storedAuth = await AsyncStorage.getItem("auth");
      setAuth(storedAuth ? JSON.parse(storedAuth) : null);
    };
    loadAuth();
  }, []);

  // auth값을 저장하는 useRef 생성 (이전 상태를 유지하기 위함)
  const authRef = useRef(auth);
  // useEffect
  useEffect(() => {
    const syncStorage = async () => {
      if (auth) {
        await AsyncStorage.setItem("auth", JSON.stringify(auth));
        await AsyncStorage.setItem("accessToken", auth.accessToken);
      } else {
        await AsyncStorage.removeItem("auth");
        await AsyncStorage.removeItem("accessToken");
      }
    };
    authRef.current = auth;
    syncStorage();
  }, [auth]);

  // axios 인스턴스 생성 (일반 API 담당)
  const api = axios.create({
    // 기본 URL 설정
    baseURL: "http://localhost:8080/v11/",
    // 브라우저가 쿠키(세션 정보 등)를 요청에 포함하도록 설정
    withCredentials: true,
  });

  // 설정해둔 axios 인스턴스로 나가는 요청을 가로챈다
  api.interceptors.request.use((config) => {
    // authRef의 현재 값이 accessToken을 포함하고있다면
    if (authRef.current?.accessToken) {
      // 헤더의 "authorization" 필드를 추가하여 Bearer 토큰을 포함시킴
      config.headers["authorization"] = `Bearer ${authRef.current.accessToken}`;
    }
    // 변경된 설정을 반환하여 요청을 계속 진행
    return config;
    // 요청 설정 중 에러가 발생하면, 그대로 거부(Promise.reject)하여 오류를 반환
  }, (error) => Promise.reject(error));

  // axios 인스턴스 생성 (토큰 재발급 요청 담당)
  const refreshApi = axios.create({
    baseURL: "http://localhost:8080/v11/",
    withCredentials: true,
  });

  // 현재 토큰이 갱신 중인지 여부를 나타내는 플래그 변수
  let isRefreshing = false;
  // 토큰 갱신이 실패한 요청을 저장할 큐 (배열)
  // 나중에 새 토큰이 생성되면 이 큐에 있는 요청을 다시 실행할 수 있도록 한다.
  let failedQueue = [];
// 요청이 실패했을때 저장된 요청을 다시 처리하는 함수
// error와 새로운 token을 받는 processQueue 생성
  const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
      if (error) {
        // 에러가 터지면 해당 요청을 거부(reject)
        prom.reject(error);
      } else {
        // 에러가 없고 새로운 토큰이 있다면, 해당 요청을 성공(resolve)하도록 함
        prom.resolve(token);
      }
    });
    // 모든 요청을 처리한 후 큐를 초기화하여 비움
    failedQueue = [];
  };

  // 응답 데이터를 가로채는 인터셉터 생성
  api.interceptors.response.use(
    // 정상적인 응답은 그대로 반환
    (response) => response,
    async (error) => {
      // 401 에러가 터진다면
      if (error.response && error.response.status === 401) {
        // 에러 설정값을 orginalRequest에 할당
        const originalRequest = error.config;

        // 현재 토큰이 갱신중이라면
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            // 대기중인 요청을 failedQueue에 추가
            failedQueue.push({ resolve, reject });
          }).then((token) => {
            // 원본 요청헤더의 Autorization에 Bearer 형태 토큰을 value로 설정
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            // 토큰을 담은 원본 요청을 api 요청에 전달
            return api(originalRequest);
          });
        }
        
        // 이제부터 토큰 갱신 시작!
        isRefreshing = true;

        try {
          // 토큰 재발급을 위한 refreshApi 호출
          const refreshResponse = await refreshApi.post("auth/refresh", {}, { withCredentials: true });
          // refreshResponse의 data를 accessToken에 할당
          const { accessToken } = refreshResponse.data;

          // accessToken이 있다면
          if (accessToken) {
            setAuth((prev) => ({ ...prev, accessToken }));
            // localStorage에 "accessToken"라는 키에 accessToken을 value로 할당
            await AsyncStorage.setItem("accessToken", accessToken);
            // 대기 중이던 요청들을 새 토큰과 함께 다시 시도하도록 처리
            processQueue(null, accessToken);

            // 원본 요청의 Authorization 헤더를 새 토큰으로 업데이트
            originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
            // 토큰을 담은 원본 요청을 api요청 함수에 담아 보낸다
            return api(originalRequest);
          }
        } catch (refreshError) {
          // 토큰 갱신 실패시 대기중이던 요청들을 에러 상태로 처리
          processQueue(refreshError, null);
          // 인증 정보 초기화 (로그아웃)
          setAuth(null);
          // localStorage 인증 관련 데이터 삭제
          await AsyncStorage.removeItem("auth");
          await AsyncStorage.removeItem("accessToken");
          // 에러를 반환하여 요청이 실패하도록 처리
          return Promise.reject(refreshError);
        } finally {
          // 토큰 갱신 상태를 초기화해 다음 요청이 새롭게 갱신을 시도할 수 있도록 함
          isRefreshing = false;
        }
      }
      // 401 에러가 아닌 다른 에러는 그대로 반환
      return Promise.reject(error);
    }
  );

  // ✅ handleSignup 함수 유지 (수정하여 정상 동작하도록 개선)
  const handleSignup = async (url, method, signupData = {}) => {
    try {
      const response = await api({
        url: `http://localhost:8080/v11/${url}`,
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        data: signupData,
      });

      // 🔹 헤더에서 토큰 추출
      let accessToken = response.headers["authorization"]; // Bearer 토큰
      if (accessToken?.startsWith("Bearer ")) {
        accessToken = accessToken.split("Bearer ")[1]; // "Bearer " 부분 제거
      }

      if (accessToken) {
        setAuth((prev) => ({ ...prev, accessToken }));
      }

      // ✅ 로그인 요청일 경우 추가 처리
      if (url === "auth/login") {
        const { accessToken, refreshToken } = response.data;
        if (accessToken && refreshToken) {
          setAuth({ accessToken, refreshToken });
          await AsyncStorage.setItem("accessToken", accessToken);
          await AsyncStorage.setItem("refreshToken", refreshToken);
        }
      }

      // ✅ 로그아웃 요청일 경우 상태 초기화
      if (url === "auth/logout") {
        setAuth(null);
        await AsyncStorage.removeItem("auth");
        await AsyncStorage.removeItem("accessToken");
        await AsyncStorage.removeItem("refreshToken");
      }

      console.log("✅ API 요청 성공:", response.data);
      Alert.alert("알림", `${url} ${method} 성공!`);
    } catch (error) {
      console.error("🚨 API 요청 실패:", error);
      console.log("오류 상세 정보:", error.response ? error.response.data : error.message);
      Alert.alert("알림", `${url} ${method} 실패! 오류 메시지: ${error.message}`);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, handleSignup, api }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
