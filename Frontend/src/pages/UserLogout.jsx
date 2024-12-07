import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    axios.post(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status == 201) {
            localStorage.removeItem('token');
            useNavigate('/login')
        }
    })

    return (
        <div>UserLogout</div>
    )
}

export default UserLogout