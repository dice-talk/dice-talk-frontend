import React, { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import ChatPost from "../../assets/icon/chat/chatPost.svg";

export default function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState('');
  const [inputFocused, setInputFocused] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <View style={[styles.inputWrapper, { flexDirection: 'row', alignItems: 'center' }]}>
      <TextInput
        style={[styles.input, { flex: inputFocused ? 1 : 1 }]}
        placeholder="메시지 입력"
        placeholderTextColor="#DEB6C2"
        value={message}
        onChangeText={setMessage}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
        multiline
      />
      {inputFocused && (
        <Pressable onPress={handleSend} style={{ marginLeft: 8 }}>
          <ChatPost width={28} height={28} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#F3CEDD",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: "#333",
    maxHeight: 100,
  },
}); 