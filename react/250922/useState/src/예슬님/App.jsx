import React from "react";
import { useState } from "react";
import MyState from "./components/MyState";
import MyButton from "./components/MyButton";
import './App.css';

function App() {
    const [state, setState] = useState('기분이 미쳤어요!!')
    return (
        <section>
            <MyButton state={state} setState={setState} />
            <MyState state={state} />
        </section>
    )
}

export default App;