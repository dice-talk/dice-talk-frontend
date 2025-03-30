import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


// 메인 화면 관련 컴포넌트
import Home from '../main/Home';
import SelectRegion from '../main/SelectRegion';
import SelectAge from '../main/SelectAge';
import DiceFriendsDs from '../main/DiceFriendsDs';
import hihihi from '../main/hihihi';
//import LetterEventScreen from '../loveEvent/LetterEventScreen';


import DropOutMember from '../plus/DropOutMember';
import CheckDropOutMember from '../plus/CheckDropOutMember';
import LendingPage from '../signUp/LendingPage';

const Stack = createStackNavigator();


export default function MainNavigator({route}) {
  const initialParams = route?.params || {};

  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={Home} initialParams={initialParams}/>
      <Stack.Screen name='SelectRegion' component={SelectRegion} />
      <Stack.Screen name='SelectAge' component={SelectAge} />
      <Stack.Screen name='DiceFriendsDs' component={DiceFriendsDs} />
      <Stack.Screen name='hihihi' component={hihihi} />
      {/* <Stack.Screen name='LetterEventScreen' component={LetterEventScreen} /> */}
      <Stack.Screen 
        name='DropOutMember' 
        component={DropOutMember}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name='CheckDropOutMember' 
        component={CheckDropOutMember}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name='LendingPage' 
        component={LendingPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
} 