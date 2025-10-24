import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [buttonColor, setButtonColor] = useState('red');
  const changeColor = buttonColor === 'red' ? 'blue' : 'red';

  return (
    <>
      <div>
        <button style={{ backgroundColor: buttonColor }} onClick={() => setButtonColor(changeColor)}>change to {changeColor}!</button>
      </div>
    </>
  )
}

export default App
