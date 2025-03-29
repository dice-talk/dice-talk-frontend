import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 마이페이지 관련 컴포넌트
import MyPage from '../mypage/MyPage';
import MyInfo from '../mypage/MyInfo';
import EditMyInfo from '../mypage/EditMyInfo';
import EditMyInfoInput from '../component/EditMyInfoInput';
import EditMyInfoClear from '../mypage/EditMyInfoClear';
import MyQuestion from '../mypage/MyQuestion';
import MyQuestionDetail from '../mypage/MyQuestionDetail';
import MyQuestionInputText from '../mypage/MyQuestionInputText';
import MyDice from '../mypage/MyDice';
import ChargeDice from '../mypage/ChargeDice';

// 회원탈퇴 관련 컴포넌트
import DropOutMember from '../plus/DropOutMember';
import CheckDropOutMember from '../plus/CheckDropOutMember';

const Stack = createNativeStackNavigator();

export default function MyPageNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='MyPage' component={MyPage} />
      <Stack.Screen name='MyInfo' component={MyInfo} />
      <Stack.Screen name='EditMyInfo' component={EditMyInfo} />
      <Stack.Screen name='EditMyInfoInput' component={EditMyInfoInput} />
      <Stack.Screen name='EditMyInfoClear' component={EditMyInfoClear} />
      <Stack.Screen name='MyQuestion' component={MyQuestion} />
      <Stack.Screen name='MyQuestionDetail' component={MyQuestionDetail} />
      <Stack.Screen name='MyQuestionInputText' component={MyQuestionInputText} />
      <Stack.Screen name='MyDice' component={MyDice} />
      <Stack.Screen name='ChargeDice' component={ChargeDice} />
      <Stack.Screen name='DropOutMember' component={DropOutMember} />
      <Stack.Screen name='CheckDropOutMember' component={CheckDropOutMember} />
    </Stack.Navigator>
  );
} 