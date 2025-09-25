import React from 'react'
import styled from 'styled-components';

const ItemList = styled.div`
    margin: 60px auto;

    ul {
      display:flow-root;
      padding: 10px;
    }

    li {
      border: 1px solid #e4e4e4;
      box-sizing: border-box;
      padding: 10px;
      box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.05);
      border-radius: 10px;
      list-style: none;
      margin: 20px 0;
    }

    .options{
        display:flow-root;
        padding: 10px;
    }
        button{
            float:right;
            padding: 10px;
            border-radius: 5px;
            border:1px solid black;
            background-color: #fff;
        }
`;


function NationList() {


    return (
        <ItemList>
            <h2>나라목록</h2>
            <ul>
                {nations.map((nation) => {
                    return (
                        <li key={nation.id}>
                            <h3>{nation.title}</h3>
                            <strong>{nation.population}</strong>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button>유럽목록</button>
                <button>전체목록</button>
            </div>
        </ItemList>
    );
}


export default function App3() {
    return (
        <NationList />
    )
}
