import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';

export default function Choice() {
    return (
        <View style={styles.container}>
            <Text>Choice</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
