// // http/emailAPI.js
// import axios from 'axios';
// import { BACK_URL } from '../mockSetup';
    
// //1. Toss 인증 요청 (authUrl, txId 받기
// export const getTossAuthUrl = async () => {
//     const response = await axios.get(BACK_URL + '/toss/request');
//     return response.data; // {authUrl, txId}
//   };
//   // 2. Toss 인증 결과 확인 + 사용자 정보 받기
//   export const checkTossAuth = async (txId) => {
//     const response = await axios.post(BACK_URL + '/toss/result', { txId });
//     return response.data; // {name, birth, gender}
//   }