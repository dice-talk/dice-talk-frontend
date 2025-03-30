import { Text, View, StyleSheet, Pressable, Image, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import FriendIcon from '../assets/icon/profile/friends_01.svg';
import Footer from "../component/Footer";
import QuestionItem from "./QuestionItem";
import { getMyQuestions } from "../utils/http/QuestionAPI";
import Pagination from "../component/Pagination";
import MyQuestionInputText from "./MyQuestionInputText";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

function Button({ title, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.button}>
        <Text>{title}</Text>
      </View>
    </Pressable>
  );
}

export default function MyQuestion({ navigation }) {

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [questions, setQuestions] = useState([]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  

  useEffect(() => {
    const fetchQuestions = async () => {
      const memberId = await AsyncStorage.getItem('memberId');
      const response = await getMyQuestions(memberId, currentPage);
  
      if (response && response.data) {
        const pageInfo = response.pageInfo;

        // 총 페이지 수 계산을 위해 전체 데이터 길이를 넘겨주는 방법 (가짜 API니까 총 개수를 직접 처리해줘야 함)
        const totalCount = pageInfo.totalElements; // 실제로는 백엔드에서 총 개수 넘겨주는 게 이상적
        const size = 4;
        setTotalPages(pageInfo.totalPages);

        const sorted = response.data.sort((a, b) => {
          return new Date(b.createAt || b.date) - new Date(a.createAt || a.date);
        });

        console.log(sorted);
        setQuestions(sorted);
      }
    };
  
    fetchQuestions();
  }, [currentPage]);

  return (
    <>
      <View style={styles.container}>
        <LinearGradient
          colors={['#D7C0FA', '#F8B4F1']}
          style={styles.backgroundShape}
        />
        <View style={styles.profileContainer}>
          <Text style={{ fontSize: 25, color: '#715E7C', bottom: 30 }}>
            나의 문의
          </Text>
          <FriendIcon width={90} height={90} />
          <Text style={styles.userName}>새침한 세찌</Text>
          <View style={styles.separator} />

          <View style={styles.buttonContainer}>
            <Button
              title={'1:1 문의글 작성'}
              onPress={() => navigation.navigate('MyQuestionInputText')}
            />
          </View>
        </View>
      </View>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView style={{ paddingTop: 10, marginBottom: 60 }}>
          {questions.map((q) => (
            <QuestionItem
              key={q.questionId}
              id={q.questionId}
              title={q.title}
              createdAt={q.createdAt}
              isAnswered={
                q.question_status === 'QUESTION_ANSWERED' || q.isAnswered
              }
            />
          ))}
        </ScrollView>
        <View style={{ position: 'absolute', bottom: 80, width: '100%' }}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </View>
      </View>
      <Footer />
    </>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  backgroundShape: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 340 ,  // 배경 높이 조정
    borderBottomLeftRadius: 160, // 둥근 효과
    borderBottomRightRadius: 160, // 둥근 효과
},
  profileContainer: {
    width: '100%',
    height: 230,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    position: 'absolute',
    top: 80,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
  },
  userName: {
    fontSize: 20,
    color: '#715E7C'
},
  separator: {
    marginVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#B28EF8',
    width: '80%',
    alignSelf: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    width: 150,
    height: 35,
    backgroundColor: '#F5E1FF',
    borderRadius: 15,
    borderColor: '#9A80BA',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});