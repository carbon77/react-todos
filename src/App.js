import React from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />
      </div>
    </BrowserRouter>
  )
}

export default App
