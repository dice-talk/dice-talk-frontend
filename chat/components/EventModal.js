import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import ArrowBoard01 from "../../assets/event/arrowBoard_01.svg";
import ArrowBoard02 from "../../assets/event/arrowBoard_02.svg";
import FriendsGame_01 from "../../assets/icon/profile/friends_game_01";
import FriendsGame_02 from "../../assets/icon/profile/friends_game_02";
import FriendsGame_05 from "../../assets/icon/profile/friends_game_05";
import LoveGameSelect_01 from "../../assets/icon/profile/love_game_select_01";
import LoveGameSelect_02 from "../../assets/icon/profile/love_game_select_02";
import LoveGameSelect_05 from "../../assets/icon/profile/love_game_select_05";

export default function EventModal({ 
  visible, 
  onClose, 
  onConfirm, 
  isConfirmed, 
  selectedIcon, 
  onSelectIcon 
}) {
  if (!visible) return null;
  
  return (
    <Pressable style={styles.overlay} onPress={onClose}>
      <View style={{ alignItems: "center" }}>
        {/* ArrowBoard를 배경으로 사용하는 영역 */}
        <View style={{ width: 520, height: 400, position: 'relative' }}>
          {isConfirmed ? (
            <ArrowBoard02 width={520} height={400} />
          ) : (
            <ArrowBoard01 width={520} height={400} />
          )}

          {/* 닫기 버튼 */}
          <Pressable onPress={onClose} style={{ position: 'absolute', top: 8, right: 10, zIndex: 1 }}>
            <Text style={{ color: "white", fontSize: 16 }}>X</Text>
          </Pressable>

          {/* 안내 텍스트 */}
          <View style={{ position: 'absolute', top: 135, left: 0, right: 0, alignItems: 'center', zIndex: 1 }}>
            <Text style={{ fontSize: 12, color: '#F8B4C4' }}>
              {isConfirmed ? "선택의 결과를 확인해주세요" : "좀 더 대화하고 싶은 상대를 선택해주세요"}
            </Text>
          </View>

          {!isConfirmed && (
            <>
              {/* 주사위 아이콘 3개 */}
              <View style={{ position: 'absolute', top: 180, left: 20, right: 0, flexDirection: 'row', justifyContent: 'center', gap: 28, zIndex: 1 }}>
                {[1, 2, 3].map(num => {
                  const isSelected = selectedIcon === num;
                  const Icon = isSelected
                    ? num === 1 ? LoveGameSelect_01
                    : num === 2 ? LoveGameSelect_02
                    : LoveGameSelect_05
                    : num === 1 ? FriendsGame_01
                    : num === 2 ? FriendsGame_02
                    : FriendsGame_05;

                  const name = num === 1 ? "한가로운 하나" : num === 2 ? "세침한 세찌" : "단호한데 다정한 다오";

                  return (
                    <Pressable key={num} onPress={() => onSelectIcon(num)} style={{ alignItems: 'center', marginLeft: num === 2 ? 20 : 10 }}>
                      <Icon width={40} height={40} />
                      <Text style={{ marginTop: 4, fontSize: 10, color: '#fff' }}>{name}</Text>
                    </Pressable>
                  );
                })}
              </View>

              {/* 남은 횟수 */}
              <Text style={{ position: 'absolute', bottom: 12, alignSelf: 'center', fontSize: 11, color: "#fff", zIndex: 1 }}>
                남은 수정 횟수 1회
              </Text>
            </>
          )}
        </View>

        {/* 확인 버튼은 보드 아래 위치 */}
        <Pressable
          style={[
            styles.confirmButton,
            { backgroundColor: selectedIcon ? "#F8B4C4" : "gray", marginTop: 16 }
          ]}
          disabled={!selectedIcon}
          onPress={onConfirm}
        >
          <Text style={styles.confirmText}>확인</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  confirmButton: {
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
  },
}); 