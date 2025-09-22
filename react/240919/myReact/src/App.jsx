
import './App.css'

function App() {
    const time = new Date();
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const date = time.getDate();
    const hour = time.getHours();
    const min = time.getMinutes();
    const sec = time.getSeconds();

    return (
        <>
            {/*hello~~*/}
            <h1>Hello Licat!</h1>
            <h1>Hello Licat!</h1>
            <input type="text" className="hello" style={{ backgroundColor: 'black' }} />

            <h2>년: {year}</h2>
            <h3>월/일: {month} {date}</h3>
            <h4>시간: {hour} {min} {sec}</h4>
        </>
    )
}

function TextArea() {
    return (
        <div className="wrapper">
            <textarea
                readOnly
                maxLength={3}
                style={{ backgroundColor: "blue" }}
            />
        </div>
    );
}

export default App
