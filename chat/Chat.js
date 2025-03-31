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
import Love_01 from '../assets/icon/profile/love_01.svg';
import Love_04 from '../assets/icon/profile/love_04.svg';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import ChatSidebar from './components/ChatSidebar';
import ChatHeader from './components/ChatHeader';
import ExitModal from './components/ExitModal';
import EventModal from './components/EventModal';
import ResultModal from './components/ResultModal';
import SignalModal from './components/SignalModal';
import { useChat } from '../context/ChatContext';

export default function Chat({ navigation }) {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [exitModalVisible, setExitModalVisible] = useState(false);
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [eventConfirmed, setEventConfirmed] = useState(false);
  const [selectedGameIcon, setSelectedGameIcon] = useState(null);
  const [resultModalVisible, setResultModalVisible] = useState(false);
  const [thirdModalVisible, setThirdModalVisible] = useState(false);
  const [myNickname, setMyNickname] = useState('');
  const scrollViewRef = useRef(null);
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').width)).current;
  const { currentRoomMessages, setCurrentRoomMessages, sendMessage, joinRoom, leaveRoom } = useChat();

  useEffect(() => {
    const fetchNickname = async () => {
      const storedNickname = await AsyncStorage.getItem('nickname');
      console.log("불러온 닉네임: ", storedNickname);
      setMyNickname(storedNickname || "익명");
    };
    fetchNickname();
  }, []);

  useEffect(() => {
    if (!myNickname) return;
    joinRoom();
    return () => leaveRoom();
  }, [myNickname]);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: sidebarVisible ? 0 : Dimensions.get('window').width,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [sidebarVisible]);

  useEffect(() => {
    if (currentRoomMessages.length > 0) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  }, [currentRoomMessages]);

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    try {
      const newMessage = {
        id: `local_${Date.now()}`,
        content: messageText,
        sender: myNickname,
        timestamp: new Date().toISOString(),
      };

      setCurrentRoomMessages((prev) => [...prev, newMessage]);
      await sendMessage(newMessage);
    } catch (error) {
      Alert.alert('오류', '메시지 전송에 실패했습니다.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ChatHeader
          title="하트시그널"
          onBack={() => navigation.goBack()}
          onToggleSidebar={() => setSidebarVisible(!sidebarVisible)}
        />

        <ScrollView
          style={{ flex: 1, padding: 16 }}
          contentContainerStyle={{ paddingBottom: 100 }}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          {currentRoomMessages.map((msg, index) => {
            const isMine = msg.sender?.trim() === myNickname?.trim();

            return (
              <ChatMessage
                key={`${msg.id}-${index}`}
                message={msg.content}
                type={isMine ? 'right' : 'left'}
                sender={msg.sender}
                icon={isMine ? Love_04 : Love_01}
                time={new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              />
            );
          })}
        </ScrollView>

        <ChatInput onSendMessage={handleSendMessage} />

        <Animated.View
          style={[{
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
            { transform: [{ translateX: slideAnim }] }]}
        >
          <ChatSidebar
            onClose={() => setSidebarVisible(false)}
            onEventPress={() => console.log("이벤트")}
            onExitPress={() => console.log("나가기")}
            onReportPress={() => navigation.navigate('ChatReport')}
            navigation={navigation}
          />
        </Animated.View>
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
