import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App3.jsx'
import Resume from './Resume.jsx'
// import App from './예슬님/App.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
