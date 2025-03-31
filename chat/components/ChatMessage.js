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
  leftContent: {
    flex: 1,
  },
  leftBubbleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
  },
  rightMessageBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 16,
    gap: 8,
    paddingLeft: '20%',
  },
  rightBubbleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
  },
  rightIconContainer: {
    alignSelf: 'flex-end',
    marginBottom: 35,
  },
  userName: {
    fontSize: 12,
    color: "#A45C73",
    marginBottom: 4,
  },
  leftBubble: {
    backgroundColor: "#E7D0EB",
    padding: 12,
    borderRadius: 12,
    maxWidth: "80%",
  },
  rightBubble: {
    backgroundColor: "#F8CDD6",
    padding: 12,
    borderRadius: 12,
    maxWidth: "80%",
  },
  messageText: {
    fontSize: 14,
    color: "#444",
  },
  timeTextLeft: {
    fontSize: 10,
    color: "#999",
    alignSelf: 'flex-end',
    marginBottom: 2,
  },
  timeTextRight: {
    fontSize: 10,
    color: "#999",
    alignSelf: "flex-end",
    marginRight: 6,
  },
});