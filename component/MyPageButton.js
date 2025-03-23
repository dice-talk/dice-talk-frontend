import { Text, View, StyleSheet, Pressable } from "react-native";

export default function Button ({title, onPress, Icon}) {
    return (
        <Pressable onPress={onPress}> 
            <View style={styles.button}>
                {Icon && <Icon width={53} height={53} style={styles.icon} />}
                <Text style={styles.title}>{title}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 160,
        height: 150,
        backgroundColor: 'white',
        borderRadius: 20,
        borderColor: '#D8B4FE',
        borderWidth: 2,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        color: '#715E7C',
    }
})

