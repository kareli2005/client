import React, { useState } from 'react'
import Credential from './components/Credential'
import { useUserData } from '../../context/UserDataContext'
import Profile from './components/Profile'
import CustomButton from '../../components/CustomButton'
import LogoutIcon from '@mui/icons-material/Logout';
import httpClient from '../../utils/httpClient';
import { useSystemMessage } from '../../context/SystemMessageContext'
import { useNavigate } from 'react-router-dom'
import routes from '../../routes'
import { CircularProgress } from '@mui/material'



const Settings = () => {

  const { userData, removeUserData } = useUserData()
  const { setMessage } = useSystemMessage()
  const [isLoading, setIslLoading] = useState(false)

  const navigate = useNavigate()

  const handleLogout = async () => {
    const errorMsg = 'Server Error, Please try again'

    setIslLoading(true)
    try {
      const response = await httpClient.get('/auth/logout')
      if (response.status === 200) {
        removeUserData()
        setMessage('success', response.data.message)
        navigate(routes.getstarted.path)
        localStorage.removeItem('jwt_token')
      } else {
        setMessage('error', response.data.error || errorMsg)
      }
    } catch (error) {
      console.error(error)
      setMessage('error', error.response?.data?.error || errorMsg)
    } finally {
      setIslLoading(false)
    }
  }



  return (
    <div className='relative w-full h-full rounded-xl flex flex-col justify-start items-center gap-4 home-container-enter'>
      {
        isLoading && <div className='absolute w-full h-full flex justify-center items-center z-50' style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}><CircularProgress /></div>
      }
      <div className='flex flex-col lg:flex-row gap-4 w-full duration-300 justify-start items-center'>
        <Profile userData={userData} />
        <div className='flex w-full h-full flex-col gap-4 font-bold text-slate-500 duration-300'>
          <Credential value={userData.email} label='Email' />
          <Credential value={userData.username} label='Username' />
          <CustomButton onclick={() => handleLogout()} text='Log Out' icon={<LogoutIcon />} red={true} />
        </div>
      </div>
    </div>
  )
}

export default Settings