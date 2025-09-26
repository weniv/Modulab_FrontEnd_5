import { useState, useRef } from "react";

export default function Stopwatch() {
    // 시작한 시간
    // const [startTime, setStartTime] = useState(null);
    const startTime = useRef(0);

    // 현재 시간 
    // const [now, setNow] = useState(null);

    // 인터벌함수의 id
    const intervalId = useRef(null);

    const [secondsPassed, setSecondsPassed] = useState(0);


    function handleStart() {
        // setStartTime(Date.now());
        // 10시 10분 5초 시작버튼을 누름. 10초가 지나서 stop 버튼을 누름. --> 10시 10분 15초

        // 30초 뒤에 다시 타이머를 시작합니다. 현재 시간은 --> 10시 10분 45초

        startTime.current = Date.now() - secondsPassed;
        // setNow(Date.now());

        intervalId.current = setInterval(() => {
            // setNow(Date.now());
            // if (startTime.current !== null && now !== null) {
            setSecondsPassed(Date.now() - startTime.current); // 기본 단위가 밀리세컨드이기 때문에 초단위로 표현하기 위해서 1000을 나눕니다.
            // }
        }, 10);

    }

    function handleStop() {
        clearInterval(intervalId.current);
    }

    // let secondsPassed = 0;

    function handleReset() {
        clearInterval(intervalId.current);
        setSecondsPassed(0);
    }

    return (
        <>
            <h1>Time passed: {(secondsPassed / 1000).toFixed(3)}</h1>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
            <button onClick={handleReset}>Reset</button>
        </>
    );
}
