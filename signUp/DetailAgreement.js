import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { termsData } from '../dummyData/TermsData';
import LongButton from '../component/LongButton';
import { FlatList } from 'react-native';

export default function DetailAgreement ({navigation}) {
    const [checked, setChecked] = useState(termsData.map(() => false));

    const toggleCheck = (index) => {
        const newChecked = [...checked];
        newChecked[index] = !newChecked[index];
        setChecked(newChecked);
    };

    const allRequiredChecked = termsData.every((term, i) => term.required ? checked[i] : true);

    const renderItem = ({ item, index }) => (
        <View key={item.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{item.title}</Text>

            <View style={styles.scrollBox}>
                <ScrollView nestedScrollEnabled={true}>
                    <Text style={styles.textContent}>{item.content}</Text>
                </ScrollView>
            </View>

            <TouchableOpacity
                onPress={() => toggleCheck(index)}
                style={styles.checkboxRow}
            >
                <Ionicons
                    name={checked[index] ? 'checkbox' : 'square-outline'}
                    size={20}
                    color='#B28EF8'
                />
                <Text style={styles.agreeText}>동의합니다.</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>이용약관</Text>

            <FlatList
                data={termsData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListFooterComponent={
                    <View style={{
                        ...styles.buttonBox,
                        opacity: allRequiredChecked ? 1 : 0.5, // 비활성 시 반투명
                    }}
                    pointerEvents={allRequiredChecked ? 'auto' : 'none'} // 클릭방지지
                    >
                        <LongButton
                            onPress={() => navigation.navigate('SignupInput', {
                                email: 'test@example.com',
                                name: '홍길동',
                                gender: '남성',
                                birth: '1999-12-29',
                              })}
                            disabled={!allRequiredChecked}
                        >
                            <Text style={styles.buttonText}> 다음 </Text>
                        </LongButton>
                    </View>
                }
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
} 

const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: '#F8F8F8',
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      alignSelf: 'center',
      marginBottom: 20,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontWeight: '600',
      fontSize: 14,
      marginBottom: 6,
    },
    scrollBox: {
        maxHeight: 120,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        backgroundColor: '#FFF',
        marginBottom: 12,
      },
    textContent: {
        fontSize: 14,
        lineHeight: 22,
        color: '#333',
      },
    checkboxRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    agreeText: {
      marginLeft: 6,
      fontSize: 13,
      color: '#444',
    },
    buttonBox: {
      marginVertical: 30,
      alignItems: 'center',
      opacity: 1,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });