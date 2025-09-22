import { useState } from "react";
import "./Button.css";

function Button() {
  const [feel, setFeel] = useState("기분을 선택해주세요!");

  function clickFeel(e) {
    setFeel(e.target.textContent);
  }

  return (
    <>
      <h1>오늘의 기분을 선택해주세요.</h1>
      <div>
        <button onClick={clickFeel}> 기분이 좋아요! </button>
        <button onClick={clickFeel}> 기분이 정말 좋아요! </button>
        <button onClick={clickFeel}> 기분이 최고예요! </button>
        <button onClick={clickFeel}> 기분이 미쳤어요! </button>
      </div>
      <p>{feel}</p>
    </>
  );
}

export default Button;
