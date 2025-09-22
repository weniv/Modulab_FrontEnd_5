import { useState } from "react";
import { Login } from "./Login";
import { HomePage } from "./HomePage";

function App() {

    const user = {
        idUser: 'jaehyun@weniv.com',
        pwUser: 1234
    }

    const [isLogin, setIsLogin] = useState(false);

    return (
        isLogin ? <HomePage setIsLogin={setIsLogin} /> : <Login user={user} setIsLogin={setIsLogin} />
    )
}

export default App;