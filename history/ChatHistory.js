import { View, Text, Pressable, StyleSheet, Image, Dimensions } from 'react-native';
import { useState } from 'react';
import Header from "../component/Header";
import Footer from "../component/Footer";
import Pagination from "../component/Pagination";
import friends_01 from "../assets/icon/profile/friends_01.svg";
import NonChat from "../assets/public/nonChat.svg";
import NonHeartMessage from "../assets/public/nonHeartMessage.svg";


const BANNER_HEIGHT = 180;

function HeartItem({ name, content, date }) {
  return (
    <View style={styles.itemContainer}>
      <Image source={friends_01} style={styles.profileIcon} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
}

function ChatItem({ name, content, date }) {
  return (
    <View style={styles.itemContainer}>
      <Image source={friends_01} style={styles.profileIcon} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
}

export default function ChatHistory() {
  const [activeTab, setActiveTab] = useState('chat');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1 }}>
        <View style={styles.bannerContainer}>
          <Image
            source={require("../assets/banner/banner_welcome.png")}
            style={styles.bannerImage}
          />
        </View>

        {/* Toggle Tabs */}
        <View style={styles.toggleContainer}>
          <Pressable
            style={[styles.toggleButton, activeTab === 'chat' && styles.activeButton]}
            onPress={() => setActiveTab('chat')}
          >
            <Text style={activeTab === 'chat' ? styles.activeText : styles.inactiveText}>1대1 채팅 내역</Text>
          </Pressable>
          <Pressable
            style={[styles.toggleButton, activeTab === 'heart' && styles.activeButton]}
            onPress={() => setActiveTab('heart')}
          >
            <Text style={activeTab === 'heart' ? styles.activeText : styles.inactiveText}>하트 히스토리</Text>
          </Pressable>
        </View>

        {activeTab === 'chat' ? (
          <>
            <Text style={styles.title}>내 채팅</Text>
            <View style={styles.emptyContainer}>
            <NonChat width={80} height={80} style={styles.emptyImage} />
              <Text style={styles.emptyText}>나의 채팅 목록이 없습니다.</Text>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.title}>내가 받은 하트</Text>
            {[...Array(5)].map((_, idx) => (
              <HeartItem
                key={idx}
                name={["네모지만 부드러운 네몽", "육감적인 직감파 육댕", "네모지만 부드러운 네몽", "세침한 세찌", "한가로운 하나"][idx]}
                content={[
                  "지켜보고있어요.",
                  "널 좋아해.",
                  "너한테 설렜었어.",
                  "I wanna be your friend!",
                  "같이 춤추고싶어요"
                ][idx]}
                date={["2025-03-15", "2025-03-11", "2025-03-07", "2025-03-03", "2025-02-28"][idx]}
              />
            ))}
          </>
        )}

        <Header />

        {/* Pagination */}
        <View style={{ position: 'absolute', bottom: 80, width: '100%' }}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </View>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    marginHorizontal: 50,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: '#F3DFFF',
    overflow: 'hidden',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#E3B1F5',
  },
  activeText: {
    color: '#4B1A60',
    fontWeight: 'bold',
  },
  inactiveText: {
    color: '#8A709B',
  },
  title: {
    fontSize: 18,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 25,
    fontWeight: '500',
    color: '#333',
  },
  bannerContainer: {
    height: BANNER_HEIGHT,
    width: "100%",
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginTop: 5,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  date: {
    fontSize: 12,
    color: '#aaa',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#000',
  },
});
 