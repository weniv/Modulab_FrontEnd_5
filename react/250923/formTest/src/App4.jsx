import React from "react";
import Question from "./Components/Question";
// import './App4.css';
import styles from './App4.module.css';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';


const GlobalStyle = createGlobalStyle`
    ${reset}
    span{
        color: red;
        font-size: 12px;
    }
`;


const App = () => {
    return (
        <>
            <GlobalStyle />
            <nav className={styles.box}>
                <ul>
                    <li id="detail" className="text">
                        상세정보
                    </li>
                    <li id="qa" className="text">
                        Q&A
                    </li>
                    <li id="review" className="text">
                        Review
                    </li>
                </ul>
                <span>hello span</span>
            </nav>
            <Question />
        </>
    );
};

export default App;