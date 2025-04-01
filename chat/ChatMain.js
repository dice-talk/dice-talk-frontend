// ... 기존 import 유지 ...
import { joinMatching, cancelMatching } from '../utils/http/nicknameUtils';

export default function ChatMain() {
  // ... 기존 state 유지 ...
  const [isInMatching, setIsInMatching] = useState(false);

  // 입장 버튼 핸들러
  const handleEnterPress = async () => {
    if (!token || !userInfo) {
      Alert.alert('알림', '로그인이 필요합니다.');
      return;
    }
    
    setIsJoiningQueue(true);
    setIsInMatching(true);
    
    try {
      const result = await joinMatching();
      if (result.chatRoomId) {
        navigation.navigate("ChatTab", {
          screen: "Chat",
          params: { roomId: result.chatRoomId },
        });
      } else {
        Alert.alert('알림', '매칭 대기열에 참가했습니다.');
      }
    } catch (error) {
      Alert.alert('오류', '매칭 참가 중 오류가 발생했습니다.');
    } finally {
      setIsJoiningQueue(false);
    }
  };

  // 돌아가기 버튼 핸들러
  const handleCancelPress = async () => {
    try {
      await cancelMatching();
      setIsInMatching(false);
      Alert.alert('알림', '매칭이 취소되었습니다.');
    } catch (error) {
      Alert.alert('오류', '매칭 취소 중 오류가 발생했습니다.');
    }
  };
} 