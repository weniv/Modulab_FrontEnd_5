import { useContext } from 'react';
import { use, Suspense, useState } from 'react';

function fetchTodo(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const todos = {
                1: { id: 1, title: '리액트 공부하기', done: false },
                2: { id: 2, title: '운동하기', done: true },
                3: { id: 3, title: '책 읽기', done: false }
            };
            resolve(todos[id]);
        }, 1000);
    });
}

function TodoDetail({ todo }) {

    const todoData = use(todo);
    return (
        <div>
            <h3>{todoData.title}</h3>
            <p>상태: {todoData.done ? '완료' : '미완료'}</p>
        </div>
    )

}


export function TodoApp() {

    const [todo, setTodo] = useState(null);


    const handleButton = (id) => {
        setTodo(fetchTodo(id));
    }

    return (
        <div>
            <h2>할 일 앱</h2>
            <button onClick={() => handleButton(1)}>할 일 1</button>
            <button onClick={() => handleButton(2)}>할 일 2</button>
            <button onClick={() => handleButton(3)}>할 일 3</button>

            {todo && (
                < Suspense fallback={<p>로딩 중...</p>}>
                    <TodoDetail todo={todo} />
                </Suspense>
            )}

        </div >
    );
}