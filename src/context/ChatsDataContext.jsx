import React, { createContext, useContext, useState } from 'react'

const ChatsDataContext = createContext()

export const useChatsData = () => {
  const context = useContext(ChatsDataContext)
  if (!context) {
    throw new Error('useChatsData must be used within a ChatsDataProvider')
  }
  return context
}

export const ChatsDataProvider = ({ children }) => {

  const [chatsData, setChatsData] = useState([])


  return (
    <ChatsDataContext.Provider value={{ chatsData, setChatsData }}>
      {children}
    </ChatsDataContext.Provider>
  )
}
