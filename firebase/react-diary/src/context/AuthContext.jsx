import { createContext, useReducer } from 'react';

// context를 객체를 생성합니다.
const AuthContext = createContext();

// 리듀서 함수를 선언합니다.
const authReducer = (state, action) => {
    switch (action.type) {
        case 'login':
            return { ...state, user: action.payload }
        case 'logout':
            return { ...state, user: null }
        default:
            return state
    }
}

// 회원정보가 담겨있을 context를 객체를 구독할 컴포넌트의 묶음 범위를 설정하는 함수입니다.
// children을 이용해 컴포넌트 안에 들어올 자식 컴포넌트들이 컨텍스트를 공유하도록 만듭니다.
const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    console.log('state: ', state);

    return (
        // { ...state, dispatch } 이 두 가지 값이 context객체를 통해 접근할 수 있는 값이 됩니다.
        <AuthContext value={{ ...state, dispatch }}>
            {children}
        </AuthContext>
    )
}

export { AuthContext, AuthContextProvider };