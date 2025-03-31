// utils/nicknameUtils.js
export const requestNickname = async (memberId) => {
    try {
      const res = await fetch(`http://172.30.1.78:8080/matching/nickname/${memberId}`, {
        method: 'POST'  // POST 요청으로 변경
      });
      const data = await res.json();
      return data.nickname;
    } catch (err) {
      console.error("닉네임 요청 실패", err);
      return null;
    }
  };
  
  