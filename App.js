import { EmailProvider } from './context/EmailContext';
import { StyleSheet, Text, View } from 'react-native';
import  { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import LendingPage from './signUp/LendingPage';
import EmailInput from './signUp/EmailInput';
import VerifyCode from './signUp/VerifyCode';
import IdentityVerification from './signUp/IdentityVerification';
import TossAuth from './signUp/TossAuth';
import MyPage from './mypage/MyPage';
import MyInfo from './mypage/MyInfo';
import MyQuestion from './mypage/MyQuestion';
import MyQuestionDetail from './mypage/MyQuestionDetail';
import { setupMockAPI } from './utils/mockSetup';
import Agreement from './signUp/Agreement';
import DetailAgreement from './signUp/DetailAgreement';
import MyQuestionInputText from './mypage/MyQuestionInputText';
import SignupInput from './signUp/SignupInput';
import Congratulate from './signUp/Congratulate';
import LoginEmail from './login/LoginEmail';
import LoginPassword from './login/LoginPassword';
import FindEmail from './login/FindEmail';

import EditMyInfo from './mypage/EditMyInfo';
import MyDice from './mypage/MyDice';
import ChargeDice from './mypage/ChargeDice';
import Chat from './chat/Chat';
import ChatReport from './chat/ChatReport'


const Stack = createNativeStackNavigator();

if(__DEV__) {
  setupMockAPI(); // mock 등록 실행!
}

export default function App() { 
  return (
    <EmailProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='LendingPage' component={LendingPage} />
          <Stack.Screen name='EmailInput' component={EmailInput} />
          <Stack.Screen name='VerifyCode' component={VerifyCode} />
          <Stack.Screen name='IdentityVerification' component={IdentityVerification} />
          <Stack.Screen name='TossAuth' component={TossAuth} />
          <Stack.Screen name='Agreement' component={Agreement} />
          <Stack.Screen name='DetailAgreement' component={DetailAgreement} />
          <Stack.Screen name='SignupInput' component={SignupInput} />
          <Stack.Screen name='Congratulate' component={Congratulate} options={{headerShown : false}}/>

          <Stack.Screen name='LoginEmail' component={LoginEmail} />
          <Stack.Screen name='LoginPassword' component={LoginPassword} />
          <Stack.Screen name='FindEmail' component={FindEmail} />






















        <Stack.Screen name='MyPage' component={MyPage} />
        <Stack.Screen name='MyInfo' component={MyInfo} />
        <Stack.Screen name='MyQuestion' component={MyQuestion} />
        <Stack.Screen name='MyQuestionDetail' component={MyQuestionDetail} />
        <Stack.Screen name='MyQuestionInputText' component={MyQuestionInputText} />
        <Stack.Screen name="EditMyInfo" component={EditMyInfo} />
        <Stack.Screen name="MyDice" component={MyDice} />
        <Stack.Screen name="ChargeDice" component={ChargeDice} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="ChatReport" component={ChatReport} />
        </Stack.Navigator>
      </NavigationContainer>
    </EmailProvider>

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
