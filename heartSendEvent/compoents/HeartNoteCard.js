import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import HeartSVG from '../assets/images/heart_event_write.svg';  // SVG 파일 필요

const { width } = Dimensions.get('window');
const svgWidth = width * 0.9;
const svgHeight = svgWidth * 1.2;

export default function HeartNoteCard({ onSubmit, onReport }) {
    const [text, setText] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.svgWrapper}>
                <HeartSVG width={svgWidth} height={svgHeight} />
                <View style={styles.inputOverlay}>
                    <TextInput
                        placeholder="따뜻한 마음을 전해보세요 ❤️"
                        value={text}
                        onChangeText={setText}
                        style={styles.input}
                        multiline
                        maxLength={100}
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.sendButton} 
                    onPress={() => onSubmit(text)}
                >
                    <Text style={styles.buttonText}>하트 보내기</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.reportButton}
                    onPress={onReport}
                >
                    <Text style={styles.reportButtonText}>신고하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 40,
    },
    svgWrapper: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputOverlay: {
        position: 'absolute',
        width: width * 0.8,
        alignItems: 'center',
        paddingHorizontal: 20,
        top: svgHeight * 0.47,
    },
    input: {
        width: '100%',
        height: 80,
        fontSize: 12,
        textAlign: 'center',
        color: '#d48ccf',
        backgroundColor: 'transparent'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 30,
    },
    sendButton: {
        backgroundColor: '#ff69b4',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 20,
    },
    reportButton: {
        backgroundColor: '#ff6b6b',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    reportButtonText: {
        color: '#fff',
        fontSize: 12,
    },
});