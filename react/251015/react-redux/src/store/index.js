// src/store/index.js - Redux Toolkit 방식
import { configureStore, createSlice } from '@reduxjs/toolkit'

const PRICE = 17500

// createSlice로 액션과 리듀서를 한 번에 생성
const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        count: 0,
        unitPrice: PRICE,
        totalPrice: 0
    },
    reducers: {
        increment: (state) => {
            // RTK는 Immer를 내장해서 직접 수정하는 것처럼 쓸 수 있음
            state.count += 1
            state.totalPrice = state.count * state.unitPrice
        },
        decrement: (state) => {
            if (state.count > 0) {
                state.count -= 1
                state.totalPrice = state.count * state.unitPrice
            }
        }
    }
})

// 액션 생성자들을 자동으로 생성해줌
export const { increment, decrement } = counterSlice.actions

// configureStore로 스토어 생성 (Redux DevTools 자동 설정됨)
const store = configureStore({
    reducer: {
        counter: counterSlice.reducer
    }
})

export default store