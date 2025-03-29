import { Text, View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Home from "../assets/icon/logo/home.svg"
import History from "../assets/icon/logo/history.svg"
import Chat from "../assets/icon/logo/chat.svg"
import MyPage from "../assets/icon/logo/mypage.svg"
import Setting from "../assets/icon/logo/history.svg"

function Button({ title, Icon, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.footerButton}>
      {Icon && <Icon width={35} height={35} />}
      <Text style={styles.footerText}>{title}</Text>
    </Pressable>
  );
}

function Footer() {
  const navigation = useNavigation();
  return (
    <View style={styles.footer}>
      <Button 
        title="Home" 
        onPress={() => navigation.navigate("Main", { screen: "Home" })} 
        Icon={Home} 
      />
      <Button 
        title="History" 
        onPress={() => navigation.navigate("History", { screen: "ChatHistory" })} 
        Icon={History} 
      />
      <Button 
        title="Chat" 
        onPress={() => navigation.navigate("ChatTab", { screen: "ChatMain" })} 
        Icon={Chat} 
      />
      <Button 
        title="My Page" 
        onPress={() => navigation.navigate("MyPageTab", { screen: "MyPage" })} 
        Icon={MyPage} 
      />
      <Button 
        title="Setting" 
        onPress={() => navigation.navigate("MyPageTab", { screen: "MyInfo" })} 
        Icon={Setting} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#B28EF8',
    marginTop: 2,
  },
});

export default Footer;