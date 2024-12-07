import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captain, setCaptain] = useState('');
  const navigate = useNavigate()


  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = {
      email: email,
      password: password
    }
    console.log(captain)

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

    if (response.status === 201) {
      const data = response.data

      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')

    }

    setEmail('')
    setPassword('')
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <Link to='/login'><img className='w-14 mb-4 ' src='https://www.svgrepo.com/show/505031/uber-driver.svg' /></Link>
        <form onSubmit={(e) => {
          submitHandler(e)
        }} >
          <h3 className='text-xg font-medium mb-2'>What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
          />
          <h3 className='text-xg font-medium F mb-2'>Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            className='bg-[#eeeeee] mb-7 rounderd px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password"
            placeholder='Password'
          />
          <button
            className='bg-[#111] text-white font-semibold mb-3 rounderd px-4 py-2 w-full text-lg placeholder:text-base'
          >Login</button>
        </form>
        <p className='text-center '>Join as a Fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
      </div>
      <div>
        <Link
          to='/login'
          className='bg-[#d5622d] flex items-center justify-center  text-white font-semibold mb-5 rounderd px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin