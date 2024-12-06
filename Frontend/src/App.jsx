import React from 'react'
import './index.css';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/userLogin'
import UserSignUp from './pages/UserSignUp'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSignUp'



const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<UserLogin/>} />
      <Route path='/sign-up' element={<UserSignUp/>} />
      <Route path='/captain-login' element={<CaptainLogin/>} />
      <Route path='/captain-signup' element={<CaptainSignUp/>} />

    </Routes>
  )
}

export default App