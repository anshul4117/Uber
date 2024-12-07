import React from 'react'
import './index.css';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/userLogin'
import UserSignUp from './pages/UserSignUp'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSignUp'
import Start from './pages/Start';
import UserProtectWrapper from './pages/UserProtectWrapper';
import UserLogout from './pages/UserLogout';
import CaptainProtectWrapper from './pages/CaptainProctectWrapper';
import CaptainHome from './pages/CaptainHome';



const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Start />} />
      <Route path='/login' element={<UserLogin />} />
      <Route path='/sign-up' element={<UserSignUp />} />
      <Route path='/captain-login' element={<CaptainLogin />} />
      <Route path='/captain-signup' element={<CaptainSignUp />} />
      <Route path='/home' element={
        <UserProtectWrapper>
          <Home />
        </UserProtectWrapper>
      } />
      <Route path='/users/logout' element={
        <UserProtectWrapper>
          <UserLogout />
        </UserProtectWrapper>
      } />
      <Route path='/captain-home' element={
        <CaptainProtectWrapper>
          <CaptainHome />
        </CaptainProtectWrapper>
      } />

    </Routes>
  )
}

export default App