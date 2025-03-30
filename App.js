import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { EmailProvider } from './context/EmailContext';
import { AuthProvider } from './utils/http/AuthContext';
import { MemberProvider } from './context/MemberContext';
import { GroupProvider } from './context/GroupContext';
import { setupMockAPI } from './utils/mockSetup';

// 네비게이션 구조 가져오기
import AppNavigator from './navigation/AppNavigator';

// 개발 환경에서 mock API 설정
if (__DEV__) {
  setupMockAPI();
}

export default function App() { 
  return (
    <AuthProvider>
      <MemberProvider>
        <EmailProvider>
          <GroupProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </GroupProvider>
        </EmailProvider>
      </MemberProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
