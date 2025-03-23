import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function LongButton ({ onPress, children }) {
  return (
    <Pressable 
    onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <LinearGradient 
      colors={["#B28EF8", "#F476E5"]}
      start= { {x: 0, y: 0.5}}
      end= { {x: 1, y: 0.5}}
      style={styles.gradient}>
        <View style={styles.innerContainer}>
          {children}
        </View>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "80%",
    borderRadius: 30,
    overflow: "hidden", // LinearGradient도 borderRadius 적용되도록
    marginVertical: 8, // 버튼 간격
  },
  pressed: {
    opacity: 0.8, // 버튼을 눌렀을 때 살짝 투명해지도록
  },
  gradient: {
    paddingVertical: 12, // 높이 
    paddingHorizontal: 16,
    alignItems: "center",  // 정렬 유지
    justifyContent: "center",  // 정렬 유지
    borderRadius: 30,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

// start와 end는 컴포넌트 속성으로 직접 지정해줘야 한다. 안그러면 무시된다.
//start: { x: 0, y: 0.5}, // 왼쪽에서 시작 (x: 0 => 왼쪽에서 시작) (y: 0.5 => 세로방향으로 중앙 정렬)
//end: { x: 1, y: 0.5},  // 오른쪽으로 끝 (x: 1 => 오른쪽에서 끝남)

// children은 React가 자동으로 만들어서 넘겨주는 특수한 prop이다.