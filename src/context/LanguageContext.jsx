import React, { createContext, useState, useContext, useEffect } from 'react'
import en from '../languages/en'
import ka from '../languages/ka'

const LanguageContext = createContext()

export const useLanguage = () => {
  return useContext(LanguageContext)
}

export const LanguageProvider = ({ children }) => {
  const storedLanguage = localStorage.getItem('language') || 'en'
  const [language, setLanguage] = useState(storedLanguage)

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const switchLanguage = (lang) => {
    setLanguage(lang)
  }

  const languageData = language === 'en' ? en : ka

  return (
    <LanguageContext.Provider value={{ languageData, switchLanguage, language }}>
      {children}
    </LanguageContext.Provider>
  )
}
