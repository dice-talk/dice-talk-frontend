import { View, Text, StyleSheet, TextInput } from 'react-native';
import LongButton from '../component/LongButton';


export default function EmailInput({navigation}) {
    return (
        <View>
            <Text>이메일 주소를 입력해주세요</Text>
            <TextInput 
            placeholder='sample@example.com'/>

            <LongButton 
            onPress={() => navigation.navigate()}
            styles={styles.text}>확인 메일 보내기</LongButton>
        </View>
    )
}

const styles = StyleSheet.create({
          text: {
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
          },
          
    });