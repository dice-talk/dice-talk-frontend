import { Text, View, StyleSheet, Pressable, Image, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import FriendIcon from '../assets/icon/profile/friends_01.svg';
import Footer from "../component/Footer";
import QuestionItem from "./QuestionItem";
import { getMyQuestions } from "../utils/http/question.API";
import Header from "../component/Header"
import MyQuestionInputText from "./MyQuestionInputText";
import { useNavigation } from '@react-navigation/native';

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

  const [questions, setQuestions] = useState([]);
  const memberId = 123; // 실제 ID로 교체
  const page = 1;

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await getMyQuestions(memberId, page);

      if (response && response.data) {
        const sorted = response.data.sort((a, b) => {
          return new Date(b.createAt || b.date) - new Date(a.createAt || a.date);
        });
        setQuestions(sorted);
      } else {
        console.warn('데이터 형식이 예상과 다릅니다:', response);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <LinearGradient colors={["#D7C0FA", "#F8B4F1"]} style={styles.backgroundShape}/>
        <Header />
          <View style={styles.profileContainer}>
            <FriendIcon width={90} height={90}/>
            <Text style={styles.userName}>새침한 세찌</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.buttonContainer}>
            <Button title={"1:1 문의글 작성"} onPress={() => navigation.navigate('MyQuestionInutText')} />
          </View>
      </View>
      {/* 질문 리스트 */}
      <ScrollView style={{ paddingTop: 10, backgroundColor: 'white' }}>
        {questions.map(q => (
          <QuestionItem
            key={q.id}
            id={q.id}
            title={q.title}
            date={q.createAt || q.date}
            isAnswered={q.question_status === 'QUESTION_ANSWERED' || q.isAnswered}
          />
        ))}
      </ScrollView>
      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'white',
  },
  backgroundShape: {
    width: '100%',
    height: 340,
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
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
    borderColor: '#B28EF8',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});