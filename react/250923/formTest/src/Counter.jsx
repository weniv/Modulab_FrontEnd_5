import { useState } from "react"

export function Counter() {

    const [number, setNumber] = useState(0);

    function increment() {
        setNumber((prev) => prev + 1);
        setNumber((prev) => prev + 1);
        setNumber((prev) => prev + 1);
    }

    function decrement() {
        setNumber(number - 1);
    }

    return (
        <>
            <h2>Current Number: {number}</h2>
            <button onClick={increment}>증가</button>
            <button onClick={decrement}>감소</button>
        </>
    )
}