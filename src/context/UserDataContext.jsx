import React, { createContext, useContext, useState, useEffect } from 'react'

const UserDataContext = createContext()

export const useUserData = () => {
  const context = useContext(UserDataContext)
  if (!context) {
    throw new Error('useUserData must be used within a UserDataProvider')
  }
  return context
}

export const UserDataProvider = ({ children }) => {
  const storedUserData = JSON.parse(localStorage.getItem('userData')) || {}

  const [userData, setUserData] = useState(storedUserData)

  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      localStorage.setItem('userData', JSON.stringify(userData))
    }
  }, [userData])

  const removeUserData = () => {
    localStorage.removeItem('userData')
    setUserData({})
  }

  return (
    <UserDataContext.Provider value={{ userData, setUserData, removeUserData }}>
      {children}
    </UserDataContext.Provider>
  )
}
