import { useRef } from 'react';
import { useActionState } from 'react';
import { useState } from 'react';

function LoginComponent() {
    // const [userName, setUserName] = useState('');
    // const [password, setPassword] = useState('');
    // const [message, setMessage] = useState('');
    // const [isLoading, setIsLoading] = useState(false);
    const loginFormRef = useRef(null);

    const [state, formAction, isPending] = useActionState(
        async (prevState, formData) => {

            const userName = formData.get('userName');
            const password = formData.get('password');

            if (!userName || !password) {
                return {
                    message: `아이디와 비밀번호를 모두 입력해주세요.`, success: false, user: null
                }
            }

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
                    return {
                        message: `로그인 성공! ${result.user.userName}님 환영합니다.`, success: true, user: result.user
                    }

                } else {
                    return {
                        message: `로그인에 실패했습니다.`, success: false, user: null
                    }
                }
            } catch (error) {
                return {
                    message: `네트워크에 문제가 발생했습니다.${error.message}`, success: false, user: null
                }
            }
        },
        {
            message: '', success: false, user: null
        }
    );

    // const handleSubmit = async (e) => {
    //     e.preventDefault(); // 폼의 기본 제출 동작 방지
    //     setIsLoading(true);
    //     setMessage('');
    //     try {
    //     } catch (error) {
    //         setMessage(`서버 연결 실패: ${error.message}`);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const handleReset = () => {
        // setUserName('');
        // setPassword('');
        // setMessage('');
        loginFormRef.current.reset();
    };

    return (
        <div>
            <h2>로그인</h2>

            <form action={formAction} ref={loginFormRef}>
                <div>
                    <label htmlFor="userName">
                        아이디:
                        <input
                            id="userName"
                            type="text"
                            name='userName'
                            // value={userName}
                            // onChange={(e) => setUserName(e.target.value)}
                            placeholder="아이디를 입력하세요"
                            disabled={isPending}
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
                            name='password'
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호를 입력하세요"
                            disabled={isPending}
                            required
                        />
                    </label>
                </div>

                <div>
                    <button type="submit" disabled={isPending}>
                        {isPending ? '로그인 중...' : '로그인'}
                    </button>
                    <button type="button" onClick={handleReset} disabled={isPending}>
                        초기화
                    </button>
                </div>
            </form>

            {/* 로그인 성공, 실패 메세지 출력 부분 */}
            {state.message && (
                <div>
                    <p>{state.message}</p>
                </div>
            )}
        </div>
    );
}

export default LoginComponent;