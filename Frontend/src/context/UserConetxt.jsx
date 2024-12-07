import React, { createContext, useState } from 'react'

export const UserDataContext = createContext();

const UserConetxt = ({ children }) => {
    const [user, setUser] = useState({
        fullName: {
            firstName: '',
            lastName: ''
        },
        email: '',
        password: ''
    });
    return (
        <UserDataContext.Provider value={{ user, setUser }}>
            <div>{children}</div>
        </UserDataContext.Provider>
    )
}

export default UserConetxt