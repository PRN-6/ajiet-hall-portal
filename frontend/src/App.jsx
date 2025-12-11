import React from 'react'
import Home from './components/Home'
import NavBar from './components/NavBar'
import { Routes ,Route } from 'react-router-dom'
import Login from './components/Login'
import Book from './components/Book'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/book" element={<Book/>}/>
      </Routes>
    </div>
  )
}

export default App