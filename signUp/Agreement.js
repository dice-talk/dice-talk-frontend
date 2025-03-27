import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LongButton from '../component/LongButton';
import LogoIcon from '../assets/icon/logo/logo_icon.svg';

const terms = [
    { id: 1, label: '서비스 이용약관 동의 (필수)', required: true },
    { id: 2, label: '개인정보 수집 및 이용 동의 (필수)', required: true },
    { id: 3, label: '만 18세 이상 여부 확인 (필수)', required: true },
    { id: 4, label: '개인정보 제 3자 제공 동의 (필수)', required: true },
    { id: 5, label: '마케팅 및 광고 수신 동의 (선택)', required: false },
    { id: 6, label: '맞춤형 광고 및 분석 활용 동의 (선택)', required: false },
    { id: 7, label: '위치 기반 서비스 이용 동의 (선택)', required: false },
  ];

  export default function AgreementScreen({ navigation }) {
    // 모든 체크박스를 비워진 상태로 시작
    const [checkedTerms, setCheckedTerms] = useState(terms.map(() => false));
    const allAgreed = checkedTerms.every(Boolean);
    const allRequiredChecked = terms
    .map((term, i) => (term.required ? checkedTerms[i] : true))
    .every(Boolean);
  
    const toggleCheck = (index) => {
      const updated = [...checkedTerms];
      updated[index] = !updated[index];
      setCheckedTerms(updated);
    };
  
    const toggleAll = () => {
      const newValue = !allAgreed;
      setCheckedTerms(terms.map(() => newValue));
    };
  
    const handleNext = () => {
      if (!terms.filter(t => t.required).every((t, i) => checkedTerms[i])) {
        alert('필수 약관에 모두 동의해주세요.');
        return;
      }
      navigation.navigate('TossAuth',{from : 'Agreement'});
    };

    return (
        <>
        <View style={styles.container}>
          <View style={styles.illustrationBox}>
              <LogoIcon width={200} height={200}/>
          </View>

          <View style={styles.checkAllBox}>
          <TouchableOpacity onPress={toggleAll} style={styles.checkbox}>
          <Ionicons name={allAgreed ? 'checkbox' : 'square-outline'} size={24} color="#B28EF8" />
          </TouchableOpacity>
          <Text style={styles.checkAllText}>아래 항목에 전부 동의합니다.</Text>
          </View>

          <View style={styles.contentBox}>
            {terms.map((term, i) => (
                <View key={term.id} style={styles.termRow}>
                    <TouchableOpacity onPress={() => toggleCheck(i)} style={styles.checkbox}>
                        <Ionicons name={checkedTerms[i] ? 'checkbox' : 'square-outline'} size={20} color="#B28EF8" />
                    </TouchableOpacity>
                    <Text style={styles.termText}>
                        {term.label}
                    </Text>
                </View>
            ))}
          </View>

          <View style={styles.focusAgreement}>
            <TouchableOpacity onPress={() => {navigation.navigate('DetailAgreement')}}>
            <Text style={styles.focusText}>이용약관 자세히 보기</Text>
            </TouchableOpacity>
          </View>
            
          <View style={{ alignItems: 'center', margin: 20, opacity: allRequiredChecked ? 1 : 0.4}}>
            <TouchableOpacity
              onPress={allRequiredChecked ?  handleNext : null} // 조건부 눌림 제어
              activeOpacity={allRequiredChecked ? 0.8 : 1}
              >
                <LongButton 
                onPress={handleNext}
                disabled={!allRequiredChecked}
                >
                    <Text style={styles.buttonText}> 다음 </Text>
                </LongButton>
              </TouchableOpacity>
          </View>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80, // 기존보다 더 아래로
    paddingHorizontal: 32, // 좌우 여백 확보
    backgroundColor: '#F9F9F9',
  },
  illustrationBox: {
    alignItems: 'center',
    marginBottom: 30,
  },
  checkAllBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingLeft: 4, // 체크박스 약간 오른쪽으로 이동
  },
  checkbox: {
    marginRight: 10,
  },
  checkAllText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  termRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingLeft: 4, // 각 항목들도 오른쪽으로
  },
  termText: {
    fontSize: 14,
    color: '#444',
    alignSelf: 'flex-start',
    marginLeft: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  contentBox: {
    marginTop: 10,        // 약간 아래로 내리기
    paddingLeft: 8,       // 왼쪽 정렬 유지
  },
  buttonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  focusAgreement: {
    width: '90%', // 전체 너비 차지
    paddingLeft: 20, // 왼쪽 여백 추가
    marginBottom: 8,
    color: '#B19ADE', // 연보라
    fontSize: 12,
    textAlign: 'center'
  },
  focusText: {
    color: '#B19ADE', // 연보라
    fontSize: 12,
    textAlign: 'center',   
    marginLeft: 8, 
  }

});