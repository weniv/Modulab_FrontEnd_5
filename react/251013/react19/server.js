const express = require('express');
const fs = require('fs'); //  Node.js가 기본적으로 제공하는 핵심 모듈 중 하나인 File System 모듈을 의미합니다. 이 모듈은 파일 읽기, 쓰기, 폴더 생성 및 삭제 등 파일 시스템과 관련된 다양한 작업을 수행할 수 있는 함수들을 제공합니다.
const app = express(); // Express 애플리케이션의 인스턴스입니다. Express 서버의 여러 기능을 설정하고 관리하는 주체라고 보시면 됩니다.


// ** cors 에러 해결을 위한 방법 **
// cors 패키지 설치: npm install cors
const cors = require('cors'); // cors 모듈 불러오기
app.use(cors()); // 2. 모든 도메인에서의 요청을 허용 (가장 간단한 설정)

// 또는 특정 출처만 허용하고 싶다면 다음과 같이 설정할 수 있습니다.
// app.use(cors({
//   origin: 'http://your-frontend-domain.com' // 프론트엔드 애플리케이션의 주소
//   // origin: ['http://localhost:3000', 'http://your-production-domain.com'] // 여러 개일 경우 배열로
//   // credentials: true // 요청에 쿠키를 포함해야 하는 경우
// }));

app.use(express.json()); // use를 통해 실행하는 Express에 내장된 미들웨어 함수 중 하나입니다. 이 미들웨어의 주된 역할은 클라이언트가 서버로 보내는 요청의 본문(body)이 JSON 형식일 경우, 이를 파싱(해석)하여 JavaScript 객체로 변환해주는 것입니다.
// 미들웨어는 요청(request)과 응답(response) 사이클 중간에 위치하여, 요청 객체, 응답 객체에 접근하고 다양한 전처리 작업(로깅, 인증, 데이터 파싱 등)을 수행합니다.


// HTTP POST 요청을 처리하는 라우트(경로)를 정의하는 메소드입니다.
// '/login': 이 라우트 핸들러가 응답할 경로를 지정합니다. 즉, 클라이언트가 서버의 /login 주소로 POST 요청을 보내면 이 함수가 실행됩니다. (예: http://yourserver.com/login)
app.post('/login', (req, res) => {
    const { userName, password } = req.body;

    // db.json 파일 읽기
    try { // 파일 읽기/파싱 오류 처리를 위해 try-catch 추가
        const data = JSON.parse(fs.readFileSync('db.json', 'utf8'));
        const users = data.user;

        const user = users.find(u => u.userName === userName && u.password === password);

        if (user) {
            res.json({ success: true, message: '로그인 성공', user: { userName: user.userName } });
            // Express의 응답(response) 객체인 res의 메소드입니다.
            // 이 메소드는 JavaScript 객체를 JSON 문자열로 변환하여 클라이언트에게 응답 본문으로 전송합니다.
            // HTTP 응답 헤더의 Content-Type을 자동으로 application/json으로 설정합니다.
            // 이 메소드를 호출하면 응답 전송이 완료됩니다.
        } else {
            res.status(401).json({ success: false, message: '로그인 실패: 아이디 또는 비밀번호가 일치하지 않습니다.' });
            //응답 객체 res의 status() 메소드는 HTTP 응답 상태 코드를 설정합니다.
            // 401은 "Unauthorized" (권한 없음)를 의미하는 HTTP 표준 상태 코드입니다. 이 코드는 클라이언트의 인증 자격 증명이 유효하지 않거나 제공되지 않아 요청이 거부되었음을 나타냅니다. 로그인 실패에 적합한 상태 코드입니다.
        }
    } catch (error) {
        console.error('db.json 파일을 읽거나 파싱하는 중 오류 발생:', error);
        res.status(500).json({ success: false, message: '서버 내부 오류가 발생했습니다.' });
        // HTTP 상태 코드 500은 **"Internal Server Error" (내부 서버 오류)**를 나타냅니다.
        //이 오류는 클라이언트의 요청은 올바르게 전달되었지만, 서버 자체에서 예기치 않은 문제나 오류가 발생하여 요청을 정상적으로 처리할 수 없을 때 반환됩니다. 즉, 문제의 원인이 클라이언트 측이 아닌 서버 측에 있다는 것을 의미합니다.
    }
});

app.listen(3000, () => {
    console.log('서버가 3000번 포트에서 실행 중입니다');
});