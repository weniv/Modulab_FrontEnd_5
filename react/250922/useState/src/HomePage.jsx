export function HomePage({ setIsLogin }) {
    return (
        <main>
            <h1>홈페이지에 오신것을 환영합니다!!</h1>
            <button onClick={() => setIsLogin(false)}>로그아웃</button>
        </main>
    )
}