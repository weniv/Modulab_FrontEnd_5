import { useState } from 'react';

function LoginComponent() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); // 폼의 기본 제출 동작 방지

        if (!userName || !password) {
            setMessage('아이디와 비밀번호를 모두 입력해주세요.');
            return;
        }

        setIsLoading(true);
        setMessage('');

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: userName,
                    password: password
                })
            });

            const result = await response.json();

            if (response.ok) {
                setMessage(`로그인 성공! ${result.user.userName}님 환영합니다.`);
            } else {
                setMessage(result.message || '로그인에 실패했습니다.');
            }

        } catch (error) {
            setMessage(`서버 연결 실패: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setUserName('');
        setPassword('');
        setMessage('');
    };

    return (
        <div>
            <h2>로그인</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="userName">
                        아이디:
                        <input
                            id="userName"
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="아이디를 입력하세요"
                            disabled={isLoading}
                            required
                        />
                    </label>
                </div>

                <div>
                    <label htmlFor="password">
                        비밀번호:
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호를 입력하세요"
                            disabled={isLoading}
                            required
                        />
                    </label>
                </div>

                <div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? '로그인 중...' : '로그인'}
                    </button>
                    <button type="button" onClick={handleReset} disabled={isLoading}>
                        초기화
                    </button>
                </div>
            </form>

            {/* 로그인 성공, 실패 메세지 출력 부분 */}
            {message && (
                <div>
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
}

export default LoginComponent;