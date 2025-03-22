// http/emailAPI.js
import axios from 'axios';

const BACK_URL = 'http://172.30.1.87:3000/email'

export const sendEmail = async (email) => {
    try{
        const response = await axios.post( BACK_URL + '/auth/email', {
            email : email,
        });

        return response.data;
    } catch (error) {
        console.error('이메일 전송 실패:', error);
        throw error;
    }
};