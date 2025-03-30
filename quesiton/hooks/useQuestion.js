import { useState, useEffect } from 'react';
import { fetchQuestions } from '../../api/question';

export const useQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadQuestions();
    }, []);

    const loadQuestions = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${BASE_URL}/inquiries/my`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${await AsyncStorage.getItem('accessToken')}`,
                },
            });
            const data = await response.json();
            setQuestions(data);
        } catch (err) {
            setError('문의 내역을 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return { questions, loading, error, refetch: loadQuestions };
};