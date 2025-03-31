import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 채팅 관련 컴포넌트
import Chat from '../chat/Chat';
import ChatReport from '../chat/ChatReport';
import ChatMain from '../chat/ChatMain';
import ChatHistory from '../history/ChatHistory';
// LetterEventScreen은 아직 개발 중
// import LetterEventScreen from '../loveEvent/LetterEventScreen';

const Stack = createNativeStackNavigator();

export default function ChatNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Chat' component={Chat} />
      <Stack.Screen name='ChatMain' component={ChatMain} />
      <Stack.Screen name='ChatReport' component={ChatReport} />

      {/* 개발 중인 화면이므로 임시로 주석 처리 */}
      {/* <Stack.Screen name='LetterEventScreen' component={LetterEventScreen} /> */}

    </Stack.Navigator>
  );
} 