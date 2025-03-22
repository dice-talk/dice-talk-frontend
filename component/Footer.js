import { Text, View, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

function Button({ title, iconName, onPress }) {
    return (
      <Pressable onPress={onPress} style={styles.footerButton}>
        <Icon name={iconName} size={24} color="#B28EF8" />
        <Text style={styles.footerText}>{title}</Text>
      </Pressable>
    );
  }
  
function Footer () {
    return (
        <View style={styles.footer}>
      <Button title="Home" iconName="home-outline" onPress={() => console.log("Home Clicked")} />
      <Button title="History" iconName="time-outline" onPress={() => console.log("History Clicked")} />
      <Button title="Chat" iconName="chatbubble-outline" onPress={() => console.log("Chat Clicked")} />
      <Button title="My Page" iconName="person-outline" onPress={() => console.log("My Page Clicked")} />
      <Button title="Setting" iconName="settings-outline" onPress={() => console.log("Setting Clicked")} />
    </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#B28EF8',
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