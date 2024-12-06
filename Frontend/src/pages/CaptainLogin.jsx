import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captainData, setCaptainData] = useState('');


  const submitHandler = (e) => {
    e.preventDefault();
    setCaptainData({
      email: email,
      password: password
    })
    setEmail('');
    setPassword('');
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <Link to='/login'><img className='w-14 mb-6 ' src='https://www.svgrepo.com/show/505031/uber-driver.svg' /></Link>
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
            className='bg-[#eeeeee] mb-7 rounderd px-4 py-2 border w-full text-lg placeholder:text-base'
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