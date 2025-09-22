import { useState } from "react";

const mainStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
};

function ShowTodayFeeling({ feeling }) {
    return <p>기분이: {feeling}</p>;
}

function ShowFeelings({ selectfeeling }) {
    const feelings = ["좋아요", "정말 좋아요!", "최고에요!", "미쳤어요!!"];

    return feelings.map((feeling) => (
        <p onClick={() => selectfeeling(feeling)}>기분이 {feeling}</p>
    ));
}

function App() {
    const [state, setState] = useState("");

    return (
        <div style={mainStyle}>
            <h1>오늘의 기분을 선택해주세요 😄</h1>
            <ShowFeelings selectfeeling={setState} />
            <ShowTodayFeeling feeling={state} />
        </div>
    );
}

export default App;