import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainProtectWrapper = ({
    children,
}) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(true)
    const { captain, setCaptain } = useContext(CaptainDataContext);


    useEffect(() => {
        if (!token) {
            navigate('/captain-login');
        }
        console.log(token)

        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            if (response.status == 201) {
                setCaptain(response.data.captain);
                setIsLoading(false)
            }
        }).catch(err => {
            localStorage.removeItem('token')
            useNavigate('captain-login')            
        })

    }, [token]);

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectWrapper