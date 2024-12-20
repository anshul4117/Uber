import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserConetxt';
import axios from 'axios';

const UserSignUp = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);


  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = ({
      fullName: {
        firstName: firstName,
        lastName: lastName
      },
      email: email,
      password: password
    });

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );
    if (response.status === 201) {
      setUser(response.data);
      localStorage.setItem('token', response.data.token)
      navigate('/home');
    }

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  }
  return (
    <div>
      <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
          <img className='w-14 mb-10 ' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' />
          <form onSubmit={(e) => {
            submitHandler(e)
          }} >

            <h3 className='text-xg font-medium mb-2'>What's your name</h3>
            <div className='flex gap-4 mb-5'>
              <input
                required
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value)
                }}
                className='bg-[#eeeeee] w-1/2 rounderd px-4 py-2 border text-lg placeholder:text-base'
                type="text"
                placeholder='first name'
              />
              <input
                required
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value)
                }}
                className='bg-[#eeeeee] w-1/2 rounderd px-4 py-2 border text-lg placeholder:text-base'
                type="text"
                placeholder='last name'
              />
            </div>
            <h3 className='text-xg font-medium mb-2'>What's your email</h3>
            <input
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className='bg-[#eeeeee] mb-5 rounderd px-4 py-2 border w-full text-lg placeholder:text-base'
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
              className='bg-[#eeeeee] mb-5 rounderd px-4 py-2 border w-full text-lg placeholder:text-base'
              type="password"
              placeholder='Password'
            />
            <button
              className='bg-[#111] text-white font-semibold mb-3 rounderd px-4 py-2 w-full text-lg placeholder:text-base'
            >Register</button>
          </form>
          <p className='text-center '>User already have Account? <Link to='/login' className='text-blue-600'>Login Here</Link></p>
        </div>
        <div>
          <p className='text-[13px] leading-tight'>
            This site is protected bt reCEPTCHA and the <span className='underline'>Google Privacy Policy</span>
            and <span className='underline'> Terms of Service apply</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserSignUp