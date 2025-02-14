import React, { useEffect, useState, useRef } from 'react'
import { useUserData } from '../../context/UserDataContext'
import { useLocation, useNavigate } from 'react-router-dom'
import routes from '../../routes'
import httpClient from '../../utils/httpClient'
import { CircularProgress } from '@mui/material'
import { Outlet } from 'react-router-dom'
import SideNavBar from './components/SideNavBar'
import { useSystemMessage } from '../../context/SystemMessageContext'
import MobileNavBar from './components/MobileNavBar'
import { useChatsData } from '../../context/ChatsDataContext'

const HomePage = () => {
  const { setUserData } = useUserData()
  const { setChatsData } = useChatsData()
  const { setMessage } = useSystemMessage()

  const [isFirstLoading, setIsFirstLoading] = useState(true)

  const navigate = useNavigate()
  const location = useLocation()
  const intervalRef = useRef(null)

  useEffect(() => {
    const errorMsg = 'Server Error, Please try again'

    const getProfile = async () => {
      try {
        const response = await httpClient.get('/home/get_data')
        if (response.status === 200) {
          setUserData(response.data.user)
          setChatsData(response.data.chats)
          if (location.pathname === routes.home.path) {
            navigate(routes.home.children.chats.path)
          }
        } else {
          setMessage('error', response.data.error || errorMsg)
          navigate(routes.getstarted.path)
        }
      } catch (error) {
        setMessage('error', error.response?.data?.error || errorMsg)
        navigate(routes.getstarted.path)
      } finally {
        setIsFirstLoading(false)
      }
    }

    getProfile()

    if (location.pathname === routes.home.children.chats.path) {
      intervalRef.current = setInterval(() => {
        getProfile()
      }, 5000)
    }

    return () => clearInterval(intervalRef.current)
  }, [location.pathname])

  if (isFirstLoading) {
    return (
      <div className='w-full h-full flex justify-center items-center bg-slate-200 p-4'>
        <div className='absolute w-full h-full flex justify-center items-center z-50'>
          <CircularProgress />
        </div>
      </div>
    )
  }

  return (
    <div className='w-full h-full flex justify-center items-center bg-slate-200 px-2 md:px-4 md:py-4'>
      <div className='flex flex-col md:flex-row w-full max-w-[512px] h-full md:h-[640px] md:max-w-[1024px] duration-300 min-w-[250px] md:gap-4'>
        <SideNavBar />
        <div className='relative w-full h-full py-4 md:py-0 overflow-hidden'>
          <Outlet />
        </div>
        <MobileNavBar />
      </div>
    </div>
  )
}

export default HomePage
