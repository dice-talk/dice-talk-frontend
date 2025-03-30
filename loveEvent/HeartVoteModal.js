import React, {useState} from "react";
import { Modal, View, Text, Pressable, StyleSheet, Button} from 'react-native';
// 이미지 컴포넌트 (import 또는 require 사용가능능)
import Love_01 from "../assets/icon/profile/love_01.svg"; // 기본 흰색
import Love_02 from "../assets/icon/profile/love_02.svg";
import Love_03 from "../assets/icon/profile/love_03.svg";
import Love_04 from "../assets/icon/profile/love_04.svg";
import Love_05 from "../assets/icon/profile/love_05.svg";
import Love_06 from "../assets/icon/profile/love_06.svg";
import Love_01_Selected from '../assets/icon/profile/love_game_select_01.svg';
import Love_02_Selected from '../assets/icon/profile/love_game_select_02.svg';
import Love_03_Selected from '../assets/icon/profile/love_game_select_03.svg';
import Love_04_Selected from '../assets/icon/profile/love_game_select_04.svg';
import Love_05_Selected from '../assets/icon/profile/love_game_select_05.svg';
import Love_06_Selected from '../assets/icon/profile/love_game_select_06.svg';

const diceOptions = [
    { id: 1, name: '한가로운 하나', DefaultIcon: Love_01, selectedIcon: Love_01_Selected },
    { id: 2, name: '두 얼굴의 매력 두리', DefaultIcon: Love_02, selectedIcon: Love_02_Selected },
    { id: 3, name: '새침한 세찌', DefaultIcon: Love_03, selectedIcon: Love_03_Selected },
    { id: 4, name: '네모지만 부드러운 네몽', DefaultIcon: Love_04, selectedIcon: Love_04_Selected },
    { id: 5, name: '단호한데 다정한 다오', DefaultIcon: Love_05, selectedIcon: Love_05_Selected },
    { id: 6, name: '육감적인 직감파 육댕', DefaultIcon: Love_06, selectedIcon: Love_06_Selected },
]

export default function HeartVoteModal({ visible, onSelectDice, onClose }) {
    const [selectedId, setSelectedId] = useState(null);

    const handleSelect = (id) => {
        setSelectedId(id);
        onSelectDice(id); // name도 같이 전달
    }

    

    return(
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modalBox}>
                    <Text style={styles.title}> 하트 메세지를 보내고 싶은 사람을 선택하세요. </Text>    

                    <View style={styles.title}></View>
                    {diceOptions.map(({ id, name, DefaultIcon, SelectedIcon }) => {
                        const isSelected = selectedId === id;
                        const Icon = isSelected ? SelectedIcon : DefaultIcon;

                        return (
                          <>
                            <Pressable key={id} onPress={() => handleSelect(id)} style={styles.diceItem}>
                                <Icon width={50} height={50} />
                                {/*<View style={{width: 50, height: 50, backgroundColor: 'red'}}></View>*/}
                                <Text style={styles.diceName}>{name}</Text>
                            </Pressable>

                            <Button title="선택" onPress={() => handleSelect(id)} />
                            </>
                        );
                    })}    
            </View>
            <Text style={styles.sub}>선택은 한 번만 가능합니다.</Text>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalBox: {
      backgroundColor: '#2f2f2f',
      borderRadius: 12,
      padding: 20,
      width: '85%',
      alignItems: 'center',
    },
    title: {
      color: '#fff',
      fontSize: 16,
      marginBottom: 20,
    },
    diceContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 16,
    },
    diceItem: {
      alignItems: 'center',
    },
    diceName: {
      marginTop: 8,
      color: '#fff',
      fontSize: 12,
    },
    sub: {
      marginTop: 20,
      fontSize: 10,
      color: '#bbb',
    },
  });


            
//                 <View style={{ position: 'absolute', top: 180, left: 20, right: 0, flexDirection: 'row', justifyContent: 'center', gap: 28, zIndex: 1 }}>
//                 {[1, 2, 3].map(num => {
//                     const isSelected = selectedIcon === num;
//                     const Icon = isSelected
//                     ? num === 1 ? LoveGameSelect_01
//                     : num === 2 ? LoveGameSelect_02
//                     : LoveGameSelect_05
//                     : num === 1 ? FriendsGame_01
//                     : num === 2 ? FriendsGame_02
//                     : FriendsGame_05;

//                     const name = num === 1 ? "한가로운 하나" : num === 2 ? "세침한 세찌" : "단호한데 다정한 다오";

//                     return (
//                     <Pressable key={num} onPress={() => onSelectIcon(num)} style={{ alignItems: 'center', marginLeft: num === 2 ? 20 : 10 }}>
//                         <Icon width={40} height={40} />
//                         <Text style={{ marginTop: 4, fontSize: 10, color: '#fff' }}>{name}</Text>
//                     </Pressable>
//                     );
//                 })}
//                 </View>

//         </Modal>
//     )
// }