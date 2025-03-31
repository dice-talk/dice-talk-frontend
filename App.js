import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { EmailProvider } from './context/EmailContext';
import { AuthProvider } from './utils/http/AuthContext';
import { MemberProvider } from './context/MemberContext';
import { GroupProvider } from './context/GroupContext';
import { EventProvider } from './context/EventContext';
import { ChatProvider } from './context/ChatContext';

// 네비게이션 구조 가져오기
import AppNavigator from './navigation/AppNavigator';


export default function App() { 
  return (
    <AuthProvider>
      <MemberProvider>
        <EventProvider>
          <EmailProvider>
            <ChatProvider>
              <GroupProvider>
                <NavigationContainer>
                  <AppNavigator />
                </NavigationContainer>
              </GroupProvider>
            </ChatProvider>
          </EmailProvider>
          </EventProvider>
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
