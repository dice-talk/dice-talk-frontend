import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LongButton from '../component/LongButton';

export default function EditMyInfoClear({ navigation }) {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#D7C0FA', '#F8B4F1']}
                style={styles.gradient}
            >
                <View style={styles.content}>
                    <ClearIcon width={120} height={120} />
                    <Text style={styles.title}>변경에 성공했습니다!</Text>
                    <Text style={styles.description}>
                        회원정보가 성공적으로 변경되었습니다.{'\n'}
                        확인 버튼을 눌러 변경된 정보를 확인해보세요.
                    </Text>
                    <LongButton onPress={() => navigation.navigate('MyPage')}>
                        <Text style={styles.buttonText}>확인</Text>
                    </LongButton>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        padding: 20,
    },
    image: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 24,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
}); 