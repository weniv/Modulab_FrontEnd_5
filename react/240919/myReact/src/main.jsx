import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import TripList from './TripList'
import Fragment from './Fragment'
import Component from './Component'
import App from './App2'
import UseState from './UseState'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <UseState />
    </StrictMode>,
)
