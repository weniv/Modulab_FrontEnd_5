function UseState(props) {
    let like = 0;

    function clickLike() {
        like += 1;
        console.log(like);
    }

    return (
        <div style={{ border: "solid 1px", width: "500px" }}>
            <button onClick={clickLike}>like <span>{like}</span></button>
        </div>
    )
}

export default UseState;