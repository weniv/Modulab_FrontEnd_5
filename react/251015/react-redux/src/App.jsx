// src/App.jsx - RTK 버전
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from './store'

function App() {
    // RTK에서는 state.counter로 접근 (slice 이름)
    const { count, unitPrice, totalPrice } = useSelector(state => state.counter)

    const dispatch = useDispatch()

    const handleIncrement = () => {
        console.log('+ INCREMENT 액션 디스패치')
        dispatch(increment())
    }

    const handleDecrement = () => {
        console.log('- DECREMENT 액션 디스패치')
        dispatch(decrement())
    }

    console.log('App 렌더링, 현재 상태:', { count, totalPrice })

    return (
        <div>
            <h1>Product Detail</h1>
            <h2>딥러닝 개발자 무릎 담요</h2>
            <span><strong>{unitPrice.toLocaleString()}</strong>원</span>

            <div>
                <button
                    type="button"
                    disabled={count <= 0}
                    onClick={handleDecrement}
                >
                    MINUS
                </button>
                <span>{count}</span>
                <button
                    type="button"
                    onClick={handleIncrement}
                >
                    PLUS
                </button>
            </div>

            <div>총 수량 <strong>{count}</strong></div>
            <div><strong>{totalPrice.toLocaleString()}</strong>원</div>
        </div>
    )
}

export default App