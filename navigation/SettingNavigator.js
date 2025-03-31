import { createStackNavigator } from '@react-navigation/stack';
import SettingScreen from '../setting/SettingMain';
//import MyQuestion from '../setting/MyQuestion';
import NotificationSetting from '../setting/AlertSetting';
import SettingUserInfoClear from '../setting/SettingUserInfoClear';

const Stack = createStackNavigator();

export default function SettingNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SettingMain" component={SettingScreen}options={{ headerShown: false }} />
      <Stack.Screen name="NotificationSetting" component={NotificationSetting}options={{ headerShown: false }} />
      <Stack.Screen name="SettingUserInfoClear" component={SettingUserInfoClear}options={{ headerShown: false }} />
      {/*<Stack.Screen name="SettingUserInfoChange" component={SettingUserInfoChange}options={{ headerShown: false }} />*/}
    </Stack.Navigator>
  );
}