// screens/Chat.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 이미지 자산 import
import LoveBack from '../assets/icon/logo/love_back.svg';
import LoveSideBar from '../assets/icon/logo/love_sidebar_nonClick.svg';
import Love_01 from '../assets/icon/profile/love_01.svg';
import Love_04 from '../assets/icon/profile/love_04.svg';

// 컴포넌트 import
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import ChatSidebar from './components/ChatSidebar';
import ChatHeader from './components/ChatHeader';
import ExitModal from './components/ExitModal';
import EventModal from './components/EventModal';
import ResultModal from './components/ResultModal';
import SignalModal from './components/SignalModal';

export default function Chat({ navigation }) {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [exitModalVisible, setExitModalVisible] = useState(false);
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [eventConfirmed, setEventConfirmed] = useState(false);
  const [selectedGameIcon, setSelectedGameIcon] = useState(null);
  const [resultModalVisible, setResultModalVisible] = useState(false);
  const [thirdModalVisible, setThirdModalVisible] = useState(false);
  const [messages, setMessages] = useState([]);

  const slideAnim = useRef(
    new Animated.Value(Dimensions.get('window').width),
  ).current;
  const scrollViewRef = useRef(null);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: sidebarVisible
        ? Dimensions.get('window').width * 0
        : Dimensions.get('window').width,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [sidebarVisible, slideAnim]);

  useEffect(() => {
    if (messages.length > 0) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;
    
    try {
      const newMessage = {
        id: `local_${Date.now()}`,
        content: messageText,
        sender: 'current_user',
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, newMessage]);
      
    } catch (error) {
      Alert.alert('오류', '메시지 전송에 실패했습니다.');
    }
  };

  const handleEventConfirm = () => {
    setEventModalVisible(false);
    setSelectedGameIcon(null);
    setTimeout(() => setResultModalVisible(true), 300);
  };

  const handleResultConfirm = () => {
    setResultModalVisible(false);
    setTimeout(() => setThirdModalVisible(true), 300);
  };

  const handleBack = () => {
    setExitModalVisible(true);
  };

  const handleExitConfirm = () => {
    setExitModalVisible(false);
    navigation.replace('Queue');
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ChatHeader
          title='DICETALK'
          onBack={handleBack}
          onToggleSidebar={() => setSidebarVisible(!sidebarVisible)}
        />

        <ScrollView
          style={styles.chatArea}
          contentContainerStyle={{ paddingBottom: 100 }}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          {messages.length === 0 && (
            <View style={styles.emptyChat}>
              <Text style={styles.emptyChatText}>대화를 시작해보세요!</Text>
            </View>
          )}

          {messages.map((msg, index) => (
            <ChatMessage
              key={msg.id || index}
              message={msg.content}
              type={msg.sender === 'current_user' ? 'right' : 'left'}
              sender={msg.sender}
              icon={msg.sender === 'current_user' ? Love_04 : Love_01}
              time={new Date(msg.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            />
          ))}
        </ScrollView>

        <ChatInput onSendMessage={handleSendMessage} />

        <Animated.View
          style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}
        >
          <ChatSidebar
            onClose={() => setSidebarVisible(false)}
            onEventPress={() => setEventModalVisible(true)}
            onExitPress={() => setExitModalVisible(true)}
            onReportPress={() => navigation.navigate('ChatReport')}
            navigation={navigation}
          />
        </Animated.View>

        <ExitModal
          visible={exitModalVisible}
          onClose={() => setExitModalVisible(false)}
          onConfirm={handleExitConfirm}
        />

        <EventModal
          visible={eventModalVisible}
          onClose={() => setEventModalVisible(false)}
          onConfirm={handleEventConfirm}
          isConfirmed={eventConfirmed}
          selectedIcon={selectedGameIcon}
          onSelectIcon={setSelectedGameIcon}
        />

        <ResultModal
          visible={resultModalVisible}
          onClose={() => setResultModalVisible(false)}
          onConfirm={handleResultConfirm}
        />

        <SignalModal
          visible={thirdModalVisible}
          onClose={() => setThirdModalVisible(false)}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatArea: {
    flex: 1,
    padding: 16,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  emptyChat: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    height: 200,
  },
  emptyChatText: {
    color: '#888',
    fontSize: 16,
  },
});
