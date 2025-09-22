import React from 'react';
import './TripList.css';

function MyComponent() {
    return (
        <React.Fragment className="my-fragment">
            <h1>리엑트프레그먼트</h1>
            <p>테스트입니다!</p>
        </React.Fragment>
    );
}

const items = [
    { id: 1, name: 'Apple', desc: '빨간건 사과' },
    { id: 2, name: 'Banana', desc: '바나나는 길어' },
    { id: 3, name: 'Cherry', desc: '체리는 비싸' }
];

function DlTest() {

    const itemList = items.map((item) => {
        return (
            <React.Fragment key={item.id}>
                <dt>{item.name}</dt>
                <dd>{item.desc}</dd>
            </React.Fragment>
        )
    });

    return (
        <dl>
            {itemList}
        </dl>
    )
}

function Fragment() {
    return (
        <DlTest />
    )
}


export default Fragment;