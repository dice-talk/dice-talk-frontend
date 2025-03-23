import { Text, View, StyleSheet, Pressable } from "react-native";

export default function Button ({title, onPress}) {
    return (
        <Pressable onPress={onPress}> 
            <View style={styles.button}>
                <Text>{title}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 150,
        height: 140,
        backgroundColor: 'white',
        borderRadius: 20,
        borderColor: '#D8B4FE',
        borderWidth: 2,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

