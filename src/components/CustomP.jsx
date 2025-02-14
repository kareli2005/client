import React from 'react'
import { useLanguage } from '../context/LanguageContext'

const CustomP = ({ textKey, classname }) => {
  const { languageData } = useLanguage()

  const text = languageData[textKey] || textKey

  return (
    <p className={classname}>
      {text}
    </p>
  )
}

export default CustomP
