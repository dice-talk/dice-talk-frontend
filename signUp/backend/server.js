const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/toss/check', (req, res) => {
  const { txId } = req.body;
  console.log('[server] Toss 인증 결과 요청 txId:', txId);

  if (txId === 'txid-1234') {
    return res.status(200).json({
      status: 'COMPLETED',
      name: '홍길동',
      birth: '19950305',
      gender: 'M',
    });
  }

  return res.status(400).json({ error: '유효하지 않은 txId입니다.' });
});

app.get('/toss/auth-url', (req, res) => {
  return res.status(200).json({
    authUrl: 'https://example.com/auth/complete', // 이건 실제 토스 authUrl로 교체해야 해
    txId: 'txid-1234',
  });
});

app.listen(8080, () => {
  console.log('✅ 서버 실행 중 on port 8080');
});

