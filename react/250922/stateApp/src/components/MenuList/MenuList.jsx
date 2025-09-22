import { MenuListItem } from "../MenuListItem/MenuListItem";
import "./MenuList.css";

export function MenuList(props) {
    // 기분 상태 리스트
    const menus = ["좋아요! 😃", "정말 좋아요! 🤭", "최고에요! 😄", "미쳤어요!! 🤪"];

    return (
        <ul className="container-list">
            {/* 리스트의 갯수만큼 아이템을 만들어보도록 합시다! */}
            {menus.map((moodEl) => (
                <MenuListItem
                    key={moodEl}
                    isSelected={props.mood === moodEl}
                    // 여기서 사용하지 않고 단순히 자식 컴포넌트에 전달하기 위한 props. 이런 모습을 props drilling 이라고 표현합니다.
                    onClick={props.onItemClick}
                    mood={moodEl}
                />
            ))}
        </ul>
    );
}
