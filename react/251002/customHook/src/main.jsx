import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import InfiniteImg from './InfiniteImg.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <InfiniteImg />
    </StrictMode>,
)
