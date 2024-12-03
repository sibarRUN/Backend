const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors'); // CORS 미들웨어 가져오기
const bongjiniRoutes = require('./src/api/bongjini'); // bongjini API 가져오기

const app = express();
app.use(cors()); // CORS 문제 해결을 위해 추가
app.use(express.json()); // JSON 요청을 처리

// API 경로 설정
app.use('/bongjini', bongjiniRoutes); // /bongjini API 연결 (사용자 키, 체중 정보 관련)

// Lambda 핸들러로 앱 변환
module.exports.handler = serverless(app);
