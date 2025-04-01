import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Footer from '../component/Footer';
import Friends_03 from '../assets/icon/profile/friends_03';
import Birth from '../assets/icon/birth.svg';
import Email from '../assets/icon/email.svg';
import Name from '../assets/icon/name.svg';
import Phone from '../assets/icon/phone.svg';
import Region from '../assets/icon/region.svg';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../utils/http/AuthContext';
import { useEffect, useState } from 'react';
import { getMyInfo } from '../utils/http/MyPageApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyInfo = () => {
  const navigation = useNavigation();
  const { setAuth } = useAuth();
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyInfo = async () => {
      const memberId = await AsyncStorage.getItem('memberId');
      const accessToken = await AsyncStorage.getItem('accessToken');
      try {
        const response = await getMyInfo(memberId, accessToken);
        console.log(response);
        setInfo(response.data);
      } catch (error) {
        console.error('내 정보 조회 에러 : ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyInfo();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <LinearGradient
          colors={['#D7C0FA', '#F8B4F1']}
          style={styles.topBackground}
        />
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size='large' color='#D8B4FE' />
            <Text style={styles.loadingText}>로딩 중...</Text>
          </View>
        ) : info ? (
          <>
            <View style={styles.profileSection}>
              <Text style={styles.title}>나의 정보</Text>
              <View style={styles.profileImageWrapper}>
                <Friends_03 width={90} height={90} />
              </View>
              <Text style={styles.name}>{info.name || '사용자'}</Text>
              <Text style={styles.notice}>
                * 프로필 사진과 닉네임은 랜덤으로 제공됩니다.
              </Text>
              <Pressable
                style={styles.editButton}
                onPress={() => navigation.navigate('EditMyInfo')}
              >
                <Text style={styles.editText}>수정하기</Text>
              </Pressable>
            </View>
            <View style={styles.infoBox}>
              <InfoRow
                label='email'
                value={info.email || 'seaOtter@gmail.com'}
                icon={Email}
              />
              <InfoRow label='name' value={info.name || '김해달'} icon={Name} />
              <InfoRow
                label='phone'
                value={info.phone || '010 - 1345 - 9099'}
                icon={Phone}
              />
              <InfoRow
                label='birth'
                value={info.birth || '2000 - 01 - 01'}
                icon={Birth}
              />
              <InfoRow
                label='region'
                value={info.region || '서울특별시 강남구'}
                icon={Region}
              />
            </View>
          </>
        ) : (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>정보를 불러올 수 없습니다.</Text>
            <Pressable
              style={styles.retryButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.retryText}>돌아가기</Text>
            </Pressable>
          </View>
        )}
      </View>

      <Footer />
    </>
  );
};

const InfoRow = ({ label, value, icon: Icon }) => (
  <View style={styles.row}>
    <View style={styles.rowContent}>
      <Icon style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
    </View>
    <Text style={styles.value}>{value}</Text>
    <View style={styles.underline} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBackground: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 280,
    borderBottomLeftRadius: 160,
    borderBottomRightRadius: 160,
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: 70,
  },
  title: {
    fontSize: 20,
    color: '#715E7C',
    marginBottom: 12,
  },
  profileImageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    color: '#715E7C',
    marginBottom: 4,
  },
  notice: {
    fontSize: 10,
    color: '#aaa',
    marginTop: 4,
    marginBottom: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#D8B4FE',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignSelf: 'flex-end',
    marginRight: 30,
  },
  editText: {
    color: '#715E7C',
    fontSize: 12,
  },
  infoBox: {
    paddingHorizontal: 30,
    marginTop: 20,
  },
  row: {
    marginBottom: 24,
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 6,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    color: '#715E7C',
  },
  value: {
    fontSize: 16,
    color: '#444',
  },
  underline: {
    borderBottomColor: '#D8B4FE',
    borderBottomWidth: 1,
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#715E7C',
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#715E7C',
    fontSize: 16,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#D8B4FE',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  retryText: {
    color: 'white',
    fontSize: 14,
  },
});

export default MyInfo;
