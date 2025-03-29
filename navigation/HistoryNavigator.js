import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 채팅 관련 컴포넌트

import ChatHistory from '../history/ChatHistory';

const Stack = createNativeStackNavigator();

export default function HistoryNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='ChatHistory' component={ChatHistory} />

    </Stack.Navigator>
  );
} 