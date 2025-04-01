import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EventProvider } from '../contexts/EventContext';

export default function ChatMainTest() {
  return (
    <EventProvider>
      <View style={styles.container}>
        <Text style={styles.text}>테스트 채팅 화면</Text>
      </View>
    </EventProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: '#8B5CF6',
  },
}); 