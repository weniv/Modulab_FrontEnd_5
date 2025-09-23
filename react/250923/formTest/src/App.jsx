import { useState } from "react";

function PetForm({ setDatas }) {

    const [petName, setPetName] = useState('');
    const [petSpecies, setPetSpecies] = useState('');
    const [petAge, setPetAge] = useState(0);

    function handleSubmit(event) {
        event.preventDefault();
        setDatas((prev) => [...prev, { name: petName, species: petSpecies, age: petAge, id: Date.now() }]);
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>새로운 애완동물을 추가하세요!</legend>
                <input type="text" value={petName} onChange={(event) => setPetName(event.target.value)} />
                <input type="text" value={petSpecies} onChange={(event) => setPetSpecies(event.target.value)} />
                <input type="number" value={petAge} onChange={(event) => setPetAge(event.target.value)} />
                <button>추가하기</button>
            </fieldset>
        </form>
    );
}


function App() {

    const [datas, setDatas] = useState([
        { name: "벨라", species: "고양이", age: "5", id: 111 },
        { name: "루시", species: "강아지", age: "3", id: 112 },
        { name: "데이지", species: "토끼", age: "2", id: 113 },
        { name: "몰리", species: "고양이", age: "1", id: 114 },
        { name: "매기", species: "강아지", age: "6", id: 115 }
    ]);

    return (
        <>
            <PetForm setDatas={setDatas} />
            <ul>
                {datas.map((data) => {
                    return <li key={data.id}>{data.name}은 {data.species}입니다. 그리고 {data.age}살 입니다.</li>
                })}
            </ul>
        </>
    )
}

export default App
