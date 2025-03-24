import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // 드롭다운
import { CityData } from "../dummyData/CityData";

export default function CitySelectBox(
    {selectedCity,
    selectedDistrict,
    setSelectedCity,
    setSelectedDistrict, 
}) {
    const handleCityChange = (city) => {
        setSelectedCity(city);
        setSelectedDistrict(null) // 도시 바뀌면 구는 초기화
    };

    return (
        <View style={styles.rowContainer}>
            {/* 시 선택 */}
            <View style={styles.itemContainer}>
                <Text style={styles.label}>시</Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={selectedCity}
                        onValueChange={handleCityChange}
                    >
                        <Picker.Item label='시 선택' value={null} />
                        {Object.keys(CityData).map((city) => (
                            <Picker.Item key={city} label={city} value={city} />
                        ))}
                    </Picker>
                </View>
            </View>
    
            {/* 구 선택 */}
            {selectedCity && (
                <View style={styles.itemContainer}>
                    <Text style={styles.label}>구/군</Text>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={selectedDistrict}
                            onValueChange={(value) => setSelectedDistrict(value)}
                        >
                            <Picker.Item label='구 선택' value={null} />
                            {CityData[selectedCity].map((district) => (
                                <Picker.Item key={district} label={district} value={district} />
                            ))}
                        </Picker>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row', // 가로 배치
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 12, // 간격을 주고 싶으면 사용 (React Native 0.71 이상)
        flexWrap: 'wrap', // 화면 작을 때 줄 바꿈
    },
    itemContainer: {
        flex: 1, // 두 항목이 같은 넓이로 나뉘도록
    },
    label: {
      fontSize: 13,
      marginTop: 12,
      marginBottom: 4,
      color: '#444',
    },
    pickerWrapper: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      marginBottom: 8,
    },
  });