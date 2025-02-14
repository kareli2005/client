import React, { useState } from 'react'
import Image from '../../assets/together-white-transparent.png'
import SubmitForm from './SubmitForm'
import CustomP from '../../components/CustomP'
import { useLanguage } from '../../context/LanguageContext'
import TranslateText from '../../components/TranslateText'
import { CircularProgress } from '@mui/material'

const LoginPage = () => {

  const { language, switchLanguage } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className='w-full h-screen flex justify-center items-center bg-slate-200 p-4'>
      <div className='relative w-full max-w-[512px] md:h-full md:max-w-[1024px] md:max-h-[640px] flex flex-col-reverse md:flex-row bg-blue-primary rounded-2xl duration-300 overflow-hidden shadow-slate-400 shadow-md'>
        {
          isLoading && <div className='absolute w-full h-full flex justify-center items-center z-50' style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}><CircularProgress /></div>
        }
        <div className='w-full min-h-[400px] md:h-full md:w-1/2 md:rounded-r-full bg-white rounded-t-[10%] overflow-hidden duration-700 p-4 flex justify-center md:justify-start md:pl-8 items-center'>
          <SubmitForm setIsLoading={setIsLoading} />
        </div>
        <div className='w-full h-1/3 min-h-[200px] md:h-full md:w-1/2 flex flex-col justify-center items-center select-none gap-2 md:gap-8 text-2xl md:text-3xl duration-300 py-8 welcome-hero-enter'>
          <CustomP classname='font-bold text-white tracking-wider' textKey='welcome to' />
          <img className='w-[150px] md:w-[200px] duration-300' src={Image} alt='together-white-transparent.png' />
        </div>
        <button onClick={() => { language == 'ka' ? switchLanguage('en') : switchLanguage('ka') }} className='absolute top-2 md:bottom-2 md:top-auto right-2 border-2 border-white rounded-xl p-2 text-white hover:text-blue-primary hover:bg-white duration-300 font-bold cursor-pointer'>{TranslateText(language)}</button>
      </div>
    </div>
  )
}
export default LoginPage