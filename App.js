import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import  { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import LendingPage from './signUp/LendingPage';
import EmailInput from './signUp/EmailInput';

const Stack = createNativeStackNavigator();

export default function App() { 
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name='LendingPage' component={LendingPage}/>
        <Stack.Screen name='EmailInput' component={EmailInput}/>
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

const screenOptions = {
  headerShown: false,
  //gestureEnabled: true, // (선택) iOS에서 제스처 네비게이션 활성화
  //animationEnabled: true, // (선택) 화면 전환 애니메이션 활성화
}
