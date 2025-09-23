import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import { Counter } from './Counter.jsx'
// import NavBar from './App2.jsx'
import App from './App5.jsx'
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
