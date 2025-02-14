import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import routes from '../../routes'
import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'
import SendIcon from '@mui/icons-material/Send'
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend'
import EmailIcon from '@mui/icons-material/Email'
import LoginIcon from '@mui/icons-material/Login'
import CustomP from '../../components/CustomP'
import TranslateText from '../../components/TranslateText'
import { useSystemMessage } from '../../context/SystemMessageContext'
import httpClient from '../../utils/httpClient'
import { notValidEmail } from '../../utils/mainUtil'

const SubmitForm = ({ setIsLoading }) => {
  const { setMessage } = useSystemMessage()
  const [isLinkSent, setIsLinkSent] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const lastSendTime = localStorage.getItem('sendCooldownStart')
    if (lastSendTime) {
      const timeElapsed = Date.now() - parseInt(lastSendTime, 10)
      const timeRemaining = 60000 - timeElapsed

      if (timeRemaining > 0) {
        setIsLinkSent(true)
        setTimeLeft(Math.floor(timeRemaining / 1000))
        const countDownInterval = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(countDownInterval)
              setIsLinkSent(false)
              localStorage.removeItem('sendCooldownStart')
              return 0
            }
            return prev - 1
          })
        }, 1000)
        return () => clearInterval(countDownInterval)
      }
    }
  }, [])

  const handleSubmit = async () => {
    if (!email) return setMessage('error', 'Please enter email')
    const emailNotValid = notValidEmail(email)
    if (emailNotValid) {
      return setMessage('error', emailNotValid)
    }
    setIsLoading(true)
    const errorMsg = 'Server Error, Please try again'
    try {
      const response = await httpClient.post('/auth/get_started', { email })
      if (response.status == 200) {
        setIsLinkSent(true)
        setMessage('success', response.data.message)
        setTimeLeft(60)
        localStorage.setItem('sendCooldownStart', Date.now().toString())
        const countDownInterval = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(countDownInterval)
              setIsLinkSent(false)
              localStorage.removeItem('sendCooldownStart')
              return 0
            }
            return prev - 1
          })
        }, 1000)
      } else {
        setMessage('error', response.data.error || errorMsg)
      }
    } catch (error) {
      setMessage('error', error.response?.data?.error || errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='w-full max-w-[300px] md:max-w-[240px] flex flex-col items-start justify-center text-blue-primary gap-2 auth-container-enter'>
      <CustomP textKey='Get Started' classname='font-bold p-2' />
      <form onSubmit={(e) => {
        e.preventDefault()
        if (!isLinkSent) handleSubmit()
      }}
        className='w-full h-auto gap-2 flex flex-col justify-center items-center'>
        <CustomInput
          id='email'
          name='email'
          value={email}
          icon={<EmailIcon />}
          setValue={setEmail}
          placeholder='Enter email...'
        />
        <CustomP classname={`${email ? 'py-1 text-center w-full' : 'py-0'} duration-300 text-sm text-slate-400`} textKey={email ? 'We will send you a registration link.' : null} />
        <CustomButton
          isDisabled={isLinkSent}
          text='Send Link'
          disabledText={`${TranslateText('Wait for')} ${timeLeft} ${TranslateText('s')}`}
          icon={<SendIcon />}
          disabledIcon={<ScheduleSendIcon />}
          type='submit'
        />
      </form>
      <div className='w-full text-blue-primary font-bold flex justify-center items-center p-2 gap-2 cursor-default'>
        <div className='w-full h-[1px] bg-blue-primary' />
        <CustomP textKey='or' uppercase={true} classname='text-center uppercase' />
        <div className='w-full h-[1px] bg-blue-primary' />
      </div>
      <CustomButton
        isDisabled={false}
        text='Log In'
        icon={<LoginIcon />}
        onclick={() => navigate(routes.login.path)}
      />
    </div>
  )
}

export default SubmitForm
