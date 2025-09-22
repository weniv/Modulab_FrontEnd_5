import './TripList.css';

const list = [
    { no: 1, area: "대전", visited: false },
    { no: 2, area: "부산", visited: true },
    { no: 3, area: "목포", visited: false },
    { no: 4, area: "제주도", visited: false },
];

function TripList() {
    return (
        <ul className='list-area'>
            {list.map((item) =>
                <li key={item.no} className={item.visited ? 'list-area-item active' : 'list-area-item'}>{item.area}</li>
            )}
        </ul>
    )
}

export default TripList;