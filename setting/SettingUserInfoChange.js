import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LongButton from "../../../../.Trash/dice-talk-frontend/component/LongButton";
import CitySelectBox from '../../../../.Trash/dice-talk-frontend/component/CitySelectBox';
import { useEmail } from '../../../../.Trash/dice-talk-frontend/context/EmailContext';

export default function SettingUserInfoChange({ route, navigation }) {
  const { email } = useEmail();

  const userInfo = route?.params?.userInfo || {
    name: '홍길동',
    gender: '남성',
    birth: '1939-03-30',
  };

  const { name, gender, birth } = userInfo;

  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const [age, setAge] = useState('');
  useEffect(() => {
    if (birth) {
      const birthYear = parseInt(birth.substring(0, 4), 10);
      const currentYear = new Date().getFullYear();
      setAge((currentYear - birthYear).toString());
    }
  }, [birth]);

  const isMatch = password.length > 0 && confirmpassword.length > 0 && password === confirmpassword;
  const isFormValid = isMatch && selectedCity && selectedDistrict;

  const handleSignup = () => {
    if (isFormValid) {
      navigation.navigate('SettingUserInfoClear');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>정보를 입력해주세요</Text>

      <Text style={styles.label}>이메일</Text>
      <Text style={styles.readOnly}>{email}</Text>

      <Text style={styles.label}>비밀번호</Text>
      <TextInput
        style={styles.input}
        placeholder="비밀번호를 입력해주세요"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <Text style={styles.label}>비밀번호 확인</Text>
      <TextInput
        style={styles.input}
        placeholder="비밀번호를 입력해주세요"
        secureTextEntry={true}
        value={confirmpassword}
        onChangeText={setConfirmPassword}
      />
      {confirmpassword.length > 0 && (
        <Text style={{ color: isMatch ? 'green' : 'red', fontSize: 12 }}>
          {isMatch ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
        </Text>
      )}

      <Text style={styles.label}>휴대폰 번호</Text>
      <Text style={styles.readOnly}>010-0000-0000</Text>

      <Text style={styles.label}>성함</Text>
      <Text style={styles.readOnly}>{name}</Text>

      <Text style={styles.label}>성별</Text>
      <Text style={styles.readOnly}>{gender}</Text>

      <Text style={styles.label}>나이</Text>
      <Text style={styles.readOnly}>{age}</Text>

      <Text style={styles.label}>지역</Text>
      <CitySelectBox
        selectedCity={selectedCity}
        selectedDistrict={selectedDistrict}
        setSelectedCity={setSelectedCity}
        setSelectedDistrict={setSelectedDistrict}
      />

      <View style={{ marginTop: 30, alignItems: 'center', opacity: isFormValid ? 1 : 0.4 }}>
        <LongButton onPress={handleSignup} disabled={!isFormValid}>
          <Text style={styles.buttonText}>가입하기</Text>
        </LongButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30
  },
  label: {
    fontSize: 14,
    marginTop: 16
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#BEBEBE',
    paddingVertical: 6,
    fontSize: 14
  },
  readOnly: {
    fontSize: 14,
    paddingVertical: 6,
    color: '#999',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});