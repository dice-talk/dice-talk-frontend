import React from "react"
import { View, TextInput, Text } from 'react-native';

export default function SignupScreen ({ route }) {
    const userInfo = route.params || {};

    return (
        <View>
            <Text>이름</Text>
            <TextInput value={userInfo.name} />
            <Text>생일</Text>
            <TextInput value={userInfo.birth} />
            <Text>성별</Text>
            <TextInput value={userInfo.gender} />
        </View>
    );
}