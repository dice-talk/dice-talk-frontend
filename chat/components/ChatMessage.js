import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChatMessage({ message, type, sender, icon: Icon, time }) {
  
  return (
    <View style={type === "left" ? styles.leftMessageBlock : styles.rightMessageBlock}>
      {type === "left" && (
        <>
          <Icon width={36} height={36} />
        </>
      )}
      <View>
        {type === "right" ? (
          <View style={styles.userRowRight}>
            <Text style={styles.userName}>{sender}</Text>
            <Icon width={36} height={36} />
          </View>
        ) : (
          <Text style={styles.userName}>{sender}</Text>
        )}
        <View style={type === "left" ? styles.leftBubble : styles.rightBubble}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
        <Text style={type === "left" ? styles.timeTextLeft : styles.timeTextRight}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  leftMessageBlock: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    gap: 8,
  },
  rightMessageBlock: {
    alignItems: "flex-end",
    marginBottom: 16,
  },
  userRowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
    justifyContent: "flex-end",
  },
  userName: {
    fontSize: 12,
    color: "#A45C73",
  },
  leftBubble: {
    backgroundColor: "#E7D0EB",
    padding: 12,
    borderRadius: 12,
    alignSelf: "flex-start",
    maxWidth: "80%",
  },
  rightBubble: {
    backgroundColor: "#F8CDD6",
    padding: 12,
    borderRadius: 12,
    alignSelf: "flex-end",
    maxWidth: "80%",
  },
  messageText: {
    fontSize: 14,
    color: "#fff",
  },
  timeTextLeft: {
    fontSize: 10,
    color: "#999",
    marginTop: 4,
    marginLeft: 44,
  },
  timeTextRight: {
    fontSize: 10,
    color: "#999",
    marginTop: 4,
    alignSelf: "flex-end",
    marginRight: 4,
  },
}); 