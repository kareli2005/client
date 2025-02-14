import React from 'react'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import routes from '../routes'
import { Link } from 'react-router-dom'

const ErrorPage = () => {

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center text-center text-gray-600'>
      <p className='font-bold text-xl sm:text-3xl lg:text-5xl duration-300'>OOPS!</p>
      <p className='font-bold text-[80px] sm:text-[140px] lg:text-[200px] duration-300'>404</p>
      <p className='font-bold text-xl sm:text-3xl lg:text-5xl duration-300'>Page Not Found</p>
      <Link
        to={routes.getstarted.path}
        className=' bg-gray-600 border-2 md:border-4 border-solid border-gray-600 rounded-lg text-white p-2 lg:p-4 text-base md:text-xl flex gap-2 items-center justify-center m-10 cursor-pointer hover:bg-transparent hover:text-gray-600 duration-300'
      >
        <ArrowBackRoundedIcon />
        <p>Get Back</p>
      </Link>
    </div>
  )
}

export default ErrorPage