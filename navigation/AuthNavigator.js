import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 회원가입 관련 컴포넌트
import LendingPage from '../signUp/LendingPage';
import EmailInput from '../signUp/EmailInput';
import VerifyCode from '../signUp/VerifyCode';
import IdentityVerification from '../signUp/IdentityVerification';
import TossAuth from '../signUp/TossAuth';
import Agreement from '../signUp/Agreement';
import DetailAgreement from '../signUp/DetailAgreement';
import SignupInput from '../signUp/SignupInput';
import Congratulate from '../signUp/Congratulate';

// 로그인 관련 컴포넌트
import LoginEmail from '../login/LoginEmail';
import LoginPassword from '../login/LoginPassword';
import FindEmail from '../login/FindEmail';
import ReceiveEmali from '../login/ReceiveEmail';
import ReceivePassword from '../login/ReceivePassword';
import BannedFatch from '../banned/BannedModal';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='LendingPage' component={LendingPage} />
      
      {/* 회원가입 플로우 */}
      <Stack.Screen name='EmailInput' component={EmailInput} />
      <Stack.Screen name='VerifyCode' component={VerifyCode} />
      <Stack.Screen name='IdentityVerification' component={IdentityVerification} />
      <Stack.Screen name='TossAuth' component={TossAuth} />
      <Stack.Screen name='Agreement' component={Agreement} />
      <Stack.Screen name='DetailAgreement' component={DetailAgreement} />
      <Stack.Screen name='SignupInput' component={SignupInput} />
      <Stack.Screen name='Congratulate' component={Congratulate} options={{headerShown : false}}/>

      {/* 로그인 플로우 */}
      <Stack.Screen name='LoginEmail' component={LoginEmail} />
      <Stack.Screen name='LoginPassword' component={LoginPassword} />
      <Stack.Screen name='FindEmail' component={FindEmail} />
      <Stack.Screen name='ReceiveEmail' component={ReceiveEmali} />
      <Stack.Screen name='ReceivePassword' component={ReceivePassword} />
      <Stack.Screen name='BannedFetch' component={BannedFatch} />
    </Stack.Navigator>
  );
} 