import React from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
    return (
        <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQzfHx8ZW58MHx8fHx8)] h-screen pt-8 flex justify-between flex-col w-full bg-red-400 '>
            <img className='w-14 ml-8 ' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' />
            <div className='bg-white pb-7 py-4 px-4 '>
                <h2 className='text-3xl font-bold' >Get Started with Uber</h2>
                <Link to='/login' className=' flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
            </div>
        </div>
    )
}

export default Home