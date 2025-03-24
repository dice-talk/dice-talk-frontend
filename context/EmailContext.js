import React, { createContext, useContext, useState } from "react";
// 1. Context 생성
const EmailContext = createContext();
// 2. Provider 생성 (앱 전체를 감싸줄 컴포넌트)
export const EmailProvider = ({children}) => {
    const [email, setEmail] = useState(''); // 전역으로 관리할 email

    return (
        <EmailContext.Provider value={{email, setEmail}}>
            {children}
        </EmailContext.Provider>
    );
};
// 3. 화면에서 쉽게 쓰기 위한 커스텀 훅
export const useEmail = () => {
    const context = useContext(EmailContext);
    //console.log('useEmail context:', context); // 확인
    return context;
};

//if (!context) throw new Error ('useEmail must be used within an EmailProvider ')
//return context;