import { Text, View, StyleSheet, Pressable } from "react-native";
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
  
function Footer () {
    return (
      <View style={styles.footer}>
        <Button title="Home" onPress={() => console.log("Home Clicked")} Icon={Home}/>
        <Button title="History" onPress={() => console.log("History Clicked")} Icon={History} />
        <Button title="Chat" onPress={() => console.log("Chat Clicked")} Icon={Chat}/>
        <Button title="My Page" onPress={() => console.log("My Page Clicked")} Icon={MyPage}/>
        <Button title="Setting" onPress={() => console.log("Setting Clicked")} Icon={Setting}/>
      </View>
    )
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
        // borderTopWidth: 1,
        // borderTopColor: '##F5F5F5',
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
})

export default Footer;