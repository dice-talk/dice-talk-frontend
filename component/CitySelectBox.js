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
        <View>
            {/* 시 선택 */}
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

        {/* 구 선택 */}
        {selectedCity && (
            <>
               <Text style={styles.label}>구/군군</Text>
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
            </>
        )}
        </View>
    );
}

const styles = StyleSheet.create({
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