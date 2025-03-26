import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from 'react-native';
import ModalAlert from "../component/ModalAlert";
import Home from '../main/Home';

export default function UserCheckScreen () {
    const [isLoading, setIsLoading] = useState(true);
    const [isBanned, setIsBanned] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            try {
                //서버에서 사용자 정보 받아오기
                const user = { isBanned: true}; // 실제 API로 대체 가능

                if (user.isBanned) {
                    setIsBanned(true)
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        checkUser();
    }, []);

    if(isLoading) {
        return (
            <ModalAlert visible={true} onClose={() => {
                //강제 종료 or 그냥 모달만 보여주고 다른 화면 못가게 하기
                }}
            />
        );
    }

    return <Home />;
}