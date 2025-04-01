import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Setting 관련 컴포넌트
import SettingMain from '../setting/SettingMain';
import SettingUserInfo from '../setting/SettingUserInfo';
import MyQuestionInputText from '../mypage/MyQuestionInputText';
import Notifications from '../setting/Notifications';
import AlertSetting from '../setting/AlertSetting';
import SettingUserInfoChange from '../setting/SettingUserInfoChange';

const Stack = createNativeStackNavigator();

export default function SettingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="SettingMain" 
        component={SettingMain}
        options={{
          title: '설정',
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="SettingUserInfo" 
        component={SettingUserInfo}
        options={{
          title: '회원정보 수정'
        }}
      />
      <Stack.Screen 
        name="MyQuestionInputText" 
        component={MyQuestionInputText}
        options={{
          title: '1 대 1 문의하기'
        }}
      />
      <Stack.Screen 
        name="Notifications" 
        component={Notifications}
        options={{
          title: '공지사항 / 이벤트'
        }}
      />
      <Stack.Screen 
        name="AlertSetting" 
        component={AlertSetting}
        options={{
          title: '설정'
        }}
      />
      <Stack.Screen 
        name="SettingUserInfoChange" 
        component={SettingUserInfoChange}
        options={{
          title: '회원정보 변경'
        }}
      />
    </Stack.Navigator>
  );
} 