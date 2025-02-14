import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import routes from '../../routes'
import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'
import EmailIcon from '@mui/icons-material/Email'
import LoginIcon from '@mui/icons-material/Login'
import CustomP from '../../components/CustomP'
import { useSystemMessage } from '../../context/SystemMessageContext'
import { ArrowBackRounded, PasswordOutlined } from '@mui/icons-material'
import httpClient from '../../utils/httpClient'

const SubmitForm = ({ setIsLoading }) => {
  const { setMessage } = useSystemMessage()

  const [credentials, setCredentials] = useState({ email: '', password: '' })

  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!credentials.email) return setMessage('error', 'Please enter email')
    if (!credentials.password) return setMessage('error', 'Please enter password')

    setIsLoading(true)
    const errorMsg = 'Server Error, Please try again'
    try {
      const response = await httpClient.post('/auth/login', credentials)
      if (response.status == 200) {
        setMessage('success', response.data.message)
        navigate(routes.home.path)
      } else {
        setMessage('error', response.data.error || errorMsg)
      }
    } catch (error) {
      console.error(error)
      setMessage('error', error.response?.data?.error || errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='w-full max-w-[300px] md:max-w-[240px] flex flex-col items-start justify-center text-blue-primary gap-2 auth-container-enter'>
      <CustomP textKey='Log In' classname='font-bold p-2' />

      <form onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
        className='w-full h-auto gap-2 flex flex-col justify-center items-center'>
        <CustomInput
          id={'email'}
          name={'email'}
          value={credentials.email}
          icon={<EmailIcon />}
          setValue={(value) => setCredentials((prev) => ({ ...prev, email: value }))}
          placeholder={'Enter email...'}
        />
        <CustomInput
          id={'password'}
          name={'password'}
          type={'password'}
          value={credentials.password}
          icon={<PasswordOutlined />}
          setValue={(value) => setCredentials((prev) => ({ ...prev, password: value }))}
          placeholder={'Enter password...'}
        />

        <CustomButton
          text={'Log In'}
          icon={<LoginIcon />}
          type={'submit'}
        />
      </form>

      <div className='w-full text-blue-pribg-blue-primary font-bold flex justify-center items-center p-2 gap-2 cursor-default'>
        <div className='w-full h-[1px] bg-blue-primary' />
        <CustomP textKey={"or"} uppercase={true} classname={'text-center uppercase'} />
        <div className='w-full h-[1px] bg-blue-primary' />
      </div>

      <CustomButton
        isDisabled={false}
        text={'Back'}
        icon={<ArrowBackRounded />}
        onclick={() => navigate(routes.getstarted.path)}
      />
    </div>
  )
}

export default SubmitForm
