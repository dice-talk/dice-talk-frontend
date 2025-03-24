import { Text, View, StyleSheet, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { LinearGradient } from 'expo-linear-gradient';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const [groupIndex, setGroupIndex] = useState(0); // 0번째 그룹부터 시작
  
    const pagesPerGroup = 5;
    const totalGroups = Math.ceil(totalPages / pagesPerGroup);
    const startPage = groupIndex * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
  
    const handlePrevGroup = () => {
      if (groupIndex > 0) setGroupIndex(groupIndex - 1);
    };
  
    const handleNextGroup = () => {
      if (groupIndex < totalGroups - 1) setGroupIndex(groupIndex + 1);
    };
  
    const pageButtons = [];
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <Pressable key={i} onPress={() => onPageChange(i)}>
          {i === currentPage ? (
            <LinearGradient
              colors={['#D7C0FA', '#F8B4F1']}
              style={styles.pageButtonActive}
            >
              <Text style={styles.pageTextActive}>{i}</Text>
            </LinearGradient>
          ) : (
            <View style={styles.pageButton}>
              <Text style={styles.pageText}>{i}</Text>
            </View>
          )}
        </Pressable>
      );
    }
  
    return (
      <View style={styles.paginationContainer}>
        <Pressable onPress={handlePrevGroup} disabled={groupIndex === 0} style={styles.arrowButton}>
          <Text style={groupIndex === 0 ? styles.disabledText : styles.pageText}>prev</Text>
        </Pressable>
        {pageButtons}
        <Pressable onPress={handleNextGroup} disabled={groupIndex >= totalGroups - 1} style={styles.arrowButton}>
          <Text style={groupIndex >= totalGroups - 1 ? styles.disabledText : styles.pageText}>next</Text>
        </Pressable>
      </View>
    );
  }

  const styles = StyleSheet.create({
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        gap: 8,
        backgroundColor: 'white',
      },
      
      arrowButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
        backgroundColor: '#eee',
      },
      
      pageButton: {
        width: 35,
        height: 35,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor: 'white',
      },
      
      pageButtonActive: {
        width: 35,
        height: 35,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      
      pageText: {
        color: '#333',
      },
      
      pageTextActive: {
        color: 'white',
        fontWeight: 'bold',
      },
      
      disabledText: {
        color: '#aaa',
      },      
  })