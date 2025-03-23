import { StatusBar } from 'expo-status-bar';
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
import SignupScreen from './signUp/SignupScreen';
import MyQuestionInputText from './mypage/MyQuestionInputText';



const Stack = createNativeStackNavigator();

if(__DEV__) {
  setupMockAPI(); // mock 등록 실행!
}

export default function App() { 
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='LendingPage' component={LendingPage} />
        <Stack.Screen name='EmailInput' component={EmailInput} />
        <Stack.Screen name='VerifyCode' component={VerifyCode} />
        <Stack.Screen name='IdentityVerification' component={IdentityVerification} />
        <Stack.Screen name='TossAuth' component={TossAuth} />
        <Stack.Screen name='SignupScreen' component={SignupScreen} />






















        <Stack.Screen name='MyPage' component={MyPage} />
        <Stack.Screen name='MyInfo' component={MyInfo} />
        <Stack.Screen name='MyQuestion' component={MyQuestion} />
        <Stack.Screen name='MyQuestionDetail' component={MyQuestionDetail} />
        <Stack.Screen name='MyQuestionInputText' component={MyQuestionInputText} />

      </Stack.Navigator>
    </NavigationContainer>
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

// const screenOptions = {
//   headerShown: false,
//   //gestureEnabled: true, // (선택) iOS에서 제스처 네비게이션 활성화
//   //animationEnabled: true, // (선택) 화면 전환 애니메이션 활성화
// }
