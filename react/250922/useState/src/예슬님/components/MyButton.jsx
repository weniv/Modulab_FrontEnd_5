


export default function MyButton({ state, setState }) {
    const defaultState = state
    const myStateData = [
        {
            id: 1,
            state: '기분이 좋아요!',
            default: true
        },
        {
            id: 2,
            state: '기분이 정말 좋아요!',
            default: false
        },
        {
            id: 3,
            state: '기분이 최고에요!',
            default: false
        },
        {
            id: 4,
            state: '기분이 미쳤어요!',
            default: false
        },
    ]
    const handleState = (e) => {
        const target = e.currentTarget.dataset.num;
        const targetState = myStateData.find((ele) => ele.id == target)?.state
        setState(targetState)
    }
    return (
        <>
            {myStateData.map((ele, idx) => (
                <button onClick={handleState} data-num={idx + 1} key={ele.id} className={`${ele.state === defaultState ? 'on' : ''}`}>{ele.state}</button>
            ))}
        </>
    )
}