// http/emailAPI.js
import axios from 'axios';
import { BACK_URL } from '../mockSetup';

export const sendEmail = async (email) => {
      try {  
        console.log(email)
        const response = await axios.post( BACK_URL + '/auth/email', {email});
        return response.data;
      } catch (err) {
        console.error('이메일 전송 실패:', err.response?.data || err.message);
        throw err; // 다시 던져서 상위에서 잡는다.
      }
};

export const verifyCode = async({ email, code }) => {
    //console.log('요청보냄!', {email, code});
    const response = await axios.post(BACK_URL + '/auth/email/verify-code', {email, code});
    //console.log('응답 받음!', response.status, response.data);
    return response.data;
};



