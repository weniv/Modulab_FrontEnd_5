import React, { createContext, useContext, useState } from 'react';

// 사용자 컨텍스트 생성
const UserContext = createContext();

// 불필요하게 큰 컨텍스트 값
const initialUserData = {
    name: '홍길동',
    email: 'hong@example.com',
    preferences: {
        theme: 'light',
        fontSize: 16,
        notifications: true
    },
    cart: {
        items: [],
        totalPrice: 0
    }
};

// Provider 컴포넌트
export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(initialUserData);

    const updateCartTotal = (newTotal) => {
        setUserData(prev => ({
            ...prev,
            cart: {
                ...prev.cart,
                totalPrice: newTotal
            }
        }));
    };

    return (
        <UserContext.Provider value={{ userData, updateCartTotal }}>
            {children}
        </UserContext.Provider>
    );
};

// 장바구니 총액만 표시하는 컴포넌트
const CartTotal = () => {
    console.log('CartTotal 리렌더링'); // 디버깅용
    const { userData } = useContext(UserContext);

    return <div>총액: {userData.cart.totalPrice}원</div>;
};

// 사용자 이름만 표시하는 컴포넌트
const UserName = () => {
    console.log('UserName 리렌더링'); // 디버깅용
    const { userData } = useContext(UserContext);

    return <div>사용자: {userData.name}</div>;
};

// 알림 설정만 표시하는 컴포넌트
const NotificationSettings = () => {
    console.log('NotificationSettings 리렌더링'); // 디버깅용
    const { userData } = useContext(UserContext);

    return (
        <div>
            알림 설정: {userData.preferences.notifications ? '켜짐' : '꺼짐'}
        </div>
    );
};

// 장바구니 업데이트 버튼
const UpdateCartButton = () => {
    console.log('UpdateCartButton 리렌더링'); // 디버깅용
    const { updateCartTotal } = useContext(UserContext);

    return (
        <button onClick={() => updateCartTotal(Math.random() * 1000)}>
            장바구니 금액 업데이트
        </button>
    );
};

// 메인 앱 컴포넌트
const App = () => {
    return (
        <UserProvider>
            <div style={{ padding: 20 }}>
                <h1>Context 리렌더링 예제</h1>
                <div style={{ display: 'grid', gap: 20 }}>
                    <UserName />
                    <CartTotal />
                    <NotificationSettings />
                    <UpdateCartButton />
                </div>
            </div>
        </UserProvider>
    );
};

export default App;