import { useState } from 'react';

function App3() {


    const roles = ['admin', 'guest', 'user'];
    const randomRoles = roles[Math.floor(Math.random() * roles.length)];

    const [userRole, setUserRole] = useState(randomRoles);
    // setUserRole(randomRoles);

    return (
        <SimpleRouter userRole={randomRoles} />
    );

}

// 가상의 컴포넌트들
const AdminView = () => <div>관리자 대시보드: 모든 정보</div>;
const GuestView = () => <div>게스트 대시보드: 로그인이 필요합니다. 잠시 뒤 로그인 페이지로 이동합니다.</div>;
const UserView = () => <div>일반사용자 대시보드: 내 프로젝트 현황</div>;


function SimpleRouter({ userRole }) {
    switch (userRole) {
        case 'admin':
            return <AdminView />
        case 'guest':
            return <GuestView />
        case 'user':
            return <UserView />
        default:
            return <GuestView />
    }
}


export default App3;