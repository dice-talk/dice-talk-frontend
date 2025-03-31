import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 각 영역별 네비게이터
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import ChatNavigator from './ChatNavigator';
import MyPageNavigator from './MyPageNavigator';
import SettingNavigator from './SettingNavigator';
import Chat from '../chat/Chat';
console.log("Chat 컴포넌트:", Chat);

// 공통 컴포넌트
import UserCheckScreen from '../screen/UserCheckScreen';
import ModalAlert from '../component/ModalAlert';

// 하트 이벤트 네비게이터
//import HeartVoteModal from '../loveEvent/HeartVoteModal';
import LetterEventScreen from '../loveEvent/LetterEventScreen';
import LetterResult from '../loveEvent/LetterResult';

import LoadingScreen from '../queue/LoadingScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* 인증 네비게이터 - 로그인 및 회원가입 관련 */}
      <Stack.Screen name='Auth' component={AuthNavigator} options={{ headerShown: false }} />
      
      {/* 메인 네비게이터 - 기본 앱 화면들 */}
      <Stack.Screen name='Main' component={MainNavigator} options={{ headerShown: false }} />
      
      {/* 채팅 네비게이터 - 채팅 관련 화면들 */}
      <Stack.Screen name='ChatTab' component={ChatNavigator} options={{ headerShown: false }}/>
      <Stack.Screen name='Chat' component={Chat} options={{ headerShown: false }}/>
      
      {/* 마이페이지 네비게이터 - 사용자 관련 화면들 */}
      <Stack.Screen name='MyPageTab' component={MyPageNavigator} options={{ headerShown: false }}/>

      {/* 설정 네비게이터 - 설정 관련 화면들 */}
      <Stack.Screen name='SettingTab' component={SettingNavigator} options={{ headerShown: false }}/>
      
      {/* 공통 컴포넌트 - 여러 화면에서 공유되는 모달 등 */}
      <Stack.Screen name='UserCheckScreen' component={UserCheckScreen} options={{ headerShown: false }} />
      <Stack.Screen name='ModalAlert' component={ModalAlert} options={{ headerShown: false }}/>

      {/* 하트 이벤트 네비게이터 */}
      {/* <Stack.Screen name='HeartVoteModal' component={HeartVoteModal} /> */}
      <Stack.Screen name='LetterEventScreen' component={LetterEventScreen} options={{ headerShown: false }} />
      <Stack.Screen name='LetterResult' component={LetterResult} options={{ headerShown: false }}/>
      
      <Stack.Screen name='LoadingScreen' component={LoadingScreen} options={{headerShown: false}} />


    </Stack.Navigator>
  );
} 