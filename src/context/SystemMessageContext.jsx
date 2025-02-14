import React, { createContext, useContext, useState } from 'react'

const SystemMessageContext = createContext()

export const useSystemMessage = () => {
  const context = useContext(SystemMessageContext)
  if (!context) {
    throw new Error('useSystemMessage must be used within a SystemMessageProvider')
  }
  return context
}

export const SystemMessageProvider = ({ children }) => {
  const [messageType, setMessageType] = useState('')
  const [messageText, setMessageText] = useState('')
  const [update, setUpdate] = useState(false)

  const setMessage = (type='', text='') => {
    setMessageType(type)
    setMessageText(text)
    setUpdate(prev => !prev)
  }

  return (
    <SystemMessageContext.Provider value={{ messageType, messageText, setMessage, update }}>
      {children}
    </SystemMessageContext.Provider>
  )
}
