// utils/nicknameUtils.js
import { BASE_URL } from "./config";
export const requestNickname = async (memberId) => {
    try {
      const res = await fetch(BASE_URL + `matching/nickname/${memberId}`, {
        method: 'POST'  // POST 요청으로 변경
      });
      const data = await res.json();
      return data.nickname;
    } catch (err) {
      console.error("닉네임 요청 실패", err);
      return null;
    }
  };
  