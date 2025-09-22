import "./MenuListItem.css";
export const MenuListItem = (props) => {

    const getBackgroundColor = () => {
        if (props.isSelected) {
            return "skyblue";
        }
    };

    const onItemClick = () => {
        props.onClick(props.mood);
    };

    return (
        <li>
            <button
                onClick={onItemClick}
                className="btn-item"
                style={{ backgroundColor: getBackgroundColor() }}
            >
                기분이: {props.mood}
            </button>
        </li>
    );
};
