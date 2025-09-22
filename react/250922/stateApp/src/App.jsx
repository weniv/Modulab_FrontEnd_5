import { useState } from "react";
import { DisplayMood } from "./components/DisplayMood/DisplayMood";
import { MenuList } from "./components/MenuList/MenuList";
import "./App.css";
export function App() {

    // 현재 기분의 상태를 관리하는 훅
    const [currentMood, setCurrentMood] = useState("");

    return (
        <div>
            <h1>오늘의 기분을 선택해주세요 😄</h1>
            <div className="app-main">
                {/* 현재 기분의 상태를 변경하는 함수 */}
                <MenuList
                    mood={currentMood}
                    onItemClick={setCurrentMood}
                />
                <DisplayMood mood={currentMood} />
            </div>
        </div>
    );
}
