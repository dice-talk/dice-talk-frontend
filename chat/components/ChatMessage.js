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
      <View style={styles.messageContainer}>
        {type === "right" ? (
          <View style={styles.rightMessageContent}>
            <View style={styles.userRowRight}>
              <Text style={styles.userName}>{sender}</Text>
            </View>
            <View style={styles.rightMessageRow}>
              <Text style={styles.timeTextRight}>{time}</Text>
              <View style={styles.rightBubble}>
                <Text style={styles.messageText}>{message}</Text>
              </View>
              <View style={styles.rightIconContainer}>
                <Icon width={36} height={36} />
              </View>
            </View>
          </View>
        ) : (
          <>
            <Text style={styles.userName}>{sender}</Text>
            <View style={styles.leftMessageRow}>
              <View style={styles.leftBubble}>
                <Text style={styles.messageText}>{message}</Text>
              </View>
              <Text style={styles.timeTextLeft}>{time}</Text>
            </View>
          </>
        )}
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
  messageContainer: {
    flex: 1,
  },
  rightMessageContent: {
    alignItems: 'flex-end',
  },
  leftContent: {
    flex: 1,
  },
  leftMessageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  rightMessageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    gap: 8,
  },
  rightIconContainer: {
    alignSelf: 'center',
    marginBottom: 12,
  },
  bubbleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
  },
  rightMessageBlock: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    marginBottom: 16,
    gap: 8,
    paddingLeft: '20%',
  },
  userRowRight: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 4,
    paddingRight: 44,
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
  },
  timeTextRight: {
    fontSize: 10,
    color: "#999",
    alignSelf: 'flex-end',
  },
});