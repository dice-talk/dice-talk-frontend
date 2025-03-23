import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import  { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import LendingPage from './signUp/LendingPage';
import EmailInput from './signUp/EmailInput';
<<<<<<< HEAD
import VerifyCode from './signUp/VerifyCode';
=======
import MyPage from './mypage/MyPage';
import MyInfo from './mypage/MyInfo';
import MyQuestion from './mypage/MyQuestion';
import MyQuestionDetail from './mypage/MyQuestionDetail';
>>>>>>> a23508d (질문 전체 및 단일 조회(질문 O 답변 X)테스트 성성공)


const Stack = createNativeStackNavigator();

export default function App() { 
  return (
    <NavigationContainer>
      <Stack.Navigator /*screenOptions={screenOptions}*/>

        <Stack.Screen name='LendingPage' component={LendingPage} />
        <Stack.Screen name='EmailInput' component={EmailInput} />
        <Stack.Screen name='VerifyCode' component={VerifyCode} />

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
