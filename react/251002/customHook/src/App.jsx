import { useState } from "react";
import useInput from "./Hook/useInput";
import useMouseLocation from "./Hook/useMouseLocation";
import TestComp from "./TestComp";
import { useScroll } from "./Hook/useScroll";

function InputComponent() {

    const [value, onChange] = useInput('');

    return (
        <>
            <input type="text" onChange={onChange} />
            <div>
                {value}
            </div>
        </>
    )
}

function SomethingComponent() {
    const [value, onChange] = useInput('');

    return (
        <>
            <input type="text" onChange={onChange} />
            <div>
                {value}가 강해졌다 돌격해!
            </div>
        </>
    )
}


function App() {
    const isBottom = useScroll();


    return (
        <>
            {/* <TestComp /> */}
            {/* <InputComponent />
            <SomethingComponent /> */}
            <div style={{ height: 3000, backgroundColor: 'hotpink' }}></div >
        </>
    )
}

export default App
