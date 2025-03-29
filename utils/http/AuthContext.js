import { createContext, useContext, useState, useEffect, useRef } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
import { Alert } from 'react-native';
import { BASE_URL } from "./config";

// 인증 관련 컨텍스트 생성
const AuthContext = createContext();

// useAuth hook 추가
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider 컴포넌트 정의 (자식 컴포넌트를 감싸서 인증 정보 제공)
export const AuthProvider = ({ children }) => {
  // 인증 상태 관리
  const [auth, setAuth] = useState(null);
  // 이전 인증 상태를 참조하기 위한 ref
  const authRef = useRef(auth);
  // 토큰 갱신 중복 방지를 위한 플래그
  let isRefreshing = false;
  // 토큰 갱신 중 실패한 요청을 저장하는 큐
  let failedQueue = [];

  // 컴포넌트 마운트 시 저장된 인증 정보 로드
  useEffect(() => {
    const loadAuth = async () => {
      // AsyncStorage에서 인증 정보 조회 및 역직렬화
      const storedAuth = await AsyncStorage.getItem("auth");
      // Keychain에서 refreshToken 조회
      const refreshToken = await Keychain.getGenericPassword();
      console.log("🔑 Keychain에서 가져온 refreshToken:", refreshToken?.password);
      setAuth(storedAuth ? { ...JSON.parse(storedAuth), refreshToken: refreshToken?.password } : null);
    };
    loadAuth();
  }, []);

  // 인증 상태 변경 시 AsyncStorage 동기화
  useEffect(() => {
    const syncStorage = async () => {
      if (auth) {
        // accessToken은 AsyncStorage에 저장
        await AsyncStorage.setItem("auth", JSON.stringify(auth));
        await AsyncStorage.setItem("accessToken", auth.accessToken);
        // refreshToken은 Keychain에 저장
        if (auth.refreshToken) {
          await Keychain.setGenericPassword('refreshToken', auth.refreshToken);
          console.log("💾 Keychain에 저장된 refreshToken:", auth.refreshToken);
        }
      } else {
        // 인증 정보 삭제
        await AsyncStorage.removeItem("auth");
        await AsyncStorage.removeItem("accessToken");
        await Keychain.resetGenericPassword();
        console.log("🗑️ Keychain에서 refreshToken 삭제됨");
      }
    };
    authRef.current = auth;
    syncStorage();
  }, [auth]);

  // axios 인스턴스 생성 (일반 API 담당)
  const api = axios.create({
    // 기본 URL 설정
    baseURL: "http://172.30.1.17:8080",
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
    baseURL: "http://172.30.1.17:8080",
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
        // 에러 발생 시 요청 거부
        prom.reject(error);
      } else {
        // 토큰 갱신 성공 시 요청 재시도
        prom.resolve(token);
      }
    });
    // 큐 초기화
    failedQueue = [];
  };

  // 인증이 포함된 HTTP 요청 처리 함수
  const fetchWithAuth = async (url, options = {}) => {
    const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
    
    // 기본 헤더 설정
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // 인증 토큰이 있는 경우 헤더에 추가
    if (authRef.current?.accessToken) {
      headers['Authorization'] = `Bearer ${authRef.current.accessToken}`;
    }

    try {
      // HTTP 요청 전송
      const response = await fetch(fullUrl, {
        ...options,
        headers,
        credentials: 'include',
      });

      // 401 Unauthorized 에러 처리
      if (response.status === 401) {
        // 토큰 갱신 중인 경우 요청을 큐에 추가
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(async (token) => {
            headers['Authorization'] = `Bearer ${token}`;
            return fetch(fullUrl, { ...options, headers, credentials: 'include' });
          });
        }

        isRefreshing = true;

        try {
          // 토큰 갱신 요청
          const refreshResponse = await fetch(`${BASE_URL}auth/refresh`, {
            method: 'POST',
            credentials: 'include',
          });

          if (!refreshResponse.ok) {
            throw new Error('Token refresh failed');
          }

          // 새로운 토큰 추출
          const { accessToken } = await refreshResponse.json();

          if (accessToken) {
            // 새로운 토큰으로 상태 업데이트
            setAuth((prev) => ({ ...prev, accessToken }));
            await AsyncStorage.setItem("accessToken", accessToken);
            // 대기 중인 요청 처리
            processQueue(null, accessToken);

            // 새로운 토큰으로 원래 요청 재시도
            headers['Authorization'] = `Bearer ${accessToken}`;
            return fetch(fullUrl, { ...options, headers, credentials: 'include' });
          }
        } catch (refreshError) {
          // 토큰 갱신 실패 처리
          processQueue(refreshError, null);
          setAuth(null);
          await AsyncStorage.removeItem("auth");
          await AsyncStorage.removeItem("accessToken");
          throw refreshError;
        } finally {
          isRefreshing = false;
        }
      }

      // 응답 상태 확인
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      throw error;
    }
  };

  // 회원가입, 로그인, 로그아웃 등의 인증 관련 요청 처리 함수
  const handleSignup = async (url, method, signupData = {}) => {
    try {
      // API 요청 전송
      const response = await fetchWithAuth(url, {
        method: method,
        body: JSON.stringify(signupData), // 요청 데이터 직렬화
      });

      // 응답 데이터 역직렬화
      const data = await response.json();
      // 인증 토큰 추출
      const accessToken = response.headers.get("authorization");

      // Bearer 토큰 처리
      if (accessToken?.startsWith("Bearer ")) {
        const token = accessToken.split("Bearer ")[1];
        setAuth((prev) => ({ ...prev, accessToken: token }));
      }

      // 로그인 성공 시 토큰 저장
      if (url === "auth/login") {
        const { accessToken, refreshToken } = data;
        if (accessToken && refreshToken) {
          setAuth({ accessToken, refreshToken });
          await AsyncStorage.setItem("accessToken", accessToken);
          // refreshToken을 Keychain에 저장
          await Keychain.setGenericPassword('refreshToken', refreshToken);
        }
      }

      // 로그아웃 시 인증 정보 삭제
      if (url === "auth/logout") {
        setAuth(null);
        await AsyncStorage.removeItem("auth");
        await AsyncStorage.removeItem("accessToken");
        await Keychain.resetGenericPassword();
      }

      console.log("✅ API 요청 성공:", data);
      Alert.alert("알림", `${url} ${method} 성공!`);
      return data;
    } catch (error) {
      console.error("🚨 API 요청 실패:", error);
      console.log("오류 상세 정보:", error.message);
      Alert.alert("알림", `${url} ${method} 실패! 오류 메시지: ${error.message}`);
      throw error;
    }
  };

  // 로그아웃 함수
  const logout = async () => {
    try {
      const response = await fetch(`${BASE_URL}auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authRef.current?.accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('로그아웃 실패');
      }

      // 로컬 상태 및 저장소 초기화
      setAuth(null);
      await AsyncStorage.removeItem("auth");
      await AsyncStorage.removeItem("accessToken");
      await Keychain.resetGenericPassword();

      return true;
    } catch (error) {
      console.error('로그아웃 중 에러 발생:', error);
      throw error;
    }
  };

  // 컨텍스트 제공자 반환
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        fetchWithAuth,
        handleSignup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};