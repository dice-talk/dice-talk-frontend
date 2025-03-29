import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 각 영역별 네비게이터
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import ChatNavigator from './ChatNavigator';
import MyPageNavigator from './MyPageNavigator';
import HistoryNavigator from './HistoryNavigator';

// 공통 컴포넌트
import UserCheckScreen from '../screen/UserCheckScreen';
import ModalAlert from '../component/ModalAlert';
import LetterEventScreen from '../loveEvent/LetterEventScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* 인증 네비게이터 - 로그인 및 회원가입 관련 */}
      <Stack.Screen name='Auth' component={AuthNavigator} />
      
      {/* 메인 네비게이터 - 기본 앱 화면들 */}
      <Stack.Screen name='Main' component={MainNavigator} />
      
      {/* 채팅 네비게이터 - 채팅 관련 화면들 */}
      <Stack.Screen name='ChatTab' component={ChatNavigator} />
      
      {/* 히스토리 네비게이터 - 히스토리 관련 화면들 */}
      <Stack.Screen name='History' component={HistoryNavigator} />
      
      {/* 마이페이지 네비게이터 - 사용자 관련 화면들 */}
      <Stack.Screen name='MyPageTab' component={MyPageNavigator} />
      
      {/* 공통 컴포넌트 - 여러 화면에서 공유되는 모달 등 */}
      <Stack.Screen name='UserCheckScreen' component={UserCheckScreen} />
      <Stack.Screen name='LetterEventScreen' component={LetterEventScreen} />
      <Stack.Screen name='ModalAlert' component={ModalAlert} />
    </Stack.Navigator>
  );
} 