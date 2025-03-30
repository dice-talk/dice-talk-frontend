import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import HeartLetter from '../assets/event/heart_letter.svg';
import { usePostEvent } from '../utils/http/eventAPI';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const svgWidth = width * 0.9;
const svgHeight = svgWidth * 1.2;

export default function LoveNoteCard ({ onSubmit }) {
    const { postEvent } = usePostEvent();
    const [text, setText] = useState('');
    const navigation = useNavigation();

    const handleSubmit = async () => {
      const event = {
        content: text,
        timestamp: new Date().toISOString(),
      };

      try {
        await postEvent(event);
      } catch (error) {
        console.error('이벤트 전송 실패:', error);
      } finally {
        navigation.navigate('Chat', { showSidebar: true });
      }
    };

    return (
        <View style={styles.container}>
            {/*<Image source={require('../assets/event/love_letter_main.png')} style={styles.bgImage} />*/}
            <View style={styles.svgWrapper}>
                <HeartLetter width={svgWidth} height={svgHeight} />
                {/*<View style={{width: svgWidth, height: svgHeight, backgroundColor: 'red'}}></View>*/}
                <View style={styles.inputOverlay}>
                     <TextInput
                        placeholder="마음에 드는 상대에게 보낼 내용을 작성해주세요"
                        value={text}
                        onChangeText={setText}
                        style={styles.input}
                        multiline
                    />
                </View>
            </View>
          <TouchableOpacity style={styles.button} onPress={() => onSubmit(text)}>
            <Text style={styles.buttonText}>보내기</Text>
          </TouchableOpacity>
        </View>
    );
};

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
      top: svgHeight * 0.47, // 두 줄 사이 위치 조절(조절 가능)
    },
    input: {
      width: '100%',
      height: 80,
      fontSize: 12,
      textAlign: 'center',
      color: '#d48ccf',
      backgroundColor: 'transparent'
    },
    button: {
      marginTop: 30,
      backgroundColor: '#f8cbd6',
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 20,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });