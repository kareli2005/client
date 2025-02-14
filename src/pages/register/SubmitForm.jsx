import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import routes from '../../routes'
import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'
import EmailIcon from '@mui/icons-material/Email'
import LoginIcon from '@mui/icons-material/Login'
import CustomP from '../../components/CustomP'
import { ArrowBackRounded, PasswordOutlined, PersonRounded } from '@mui/icons-material'
import { useSystemMessage } from '../../context/SystemMessageContext'
import httpClient from '../../utils/httpClient'
import { notValidEmail, notValidPassword } from '../../utils/mainUtil'

const SubmitForm = ({ setIsLoading }) => {
  const { setMessage } = useSystemMessage()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    username: '',
  })

  useEffect(() => {
    const serverEmail = searchParams.get('email')

    setCredentials((prev) => ({
      ...prev,
      email: serverEmail || '',
    }))
  }, [searchParams])

  const handleSubmit = async () => {
    if (!credentials.email) return setMessage('error', 'Please enter email')
    if (!credentials.username) return setMessage('error', 'Please enter username')
    if (!credentials.password) return setMessage('error', 'Please enter password')
    const emailNotValid = notValidEmail(credentials.email)
    const passwordNotValid = notValidPassword(credentials.password)

    if (emailNotValid) {
      return setMessage('error', emailNotValid)
    }
    if (passwordNotValid) {
      return setMessage('error', passwordNotValid)
    }

    setIsLoading(true)
    const errorMsg = 'Server Error, Please try again'
    try {
      const response = await httpClient.post('/auth/register', credentials)
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
      <CustomP textKey='Register' classname='font-bold p-2' />

      <form onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }} className='w-full h-auto gap-2 flex flex-col justify-center items-center'>

        <CustomInput
          id='email'
          name='email'
          value={credentials.email}
          icon={<EmailIcon />}
          disabled={true}
          placeholder='Enter email...'
        />

        <CustomInput
          id='username'
          name='username'
          type='text'
          value={credentials.username}
          icon={<PersonRounded />}
          setValue={(value) => setCredentials((prev) => ({ ...prev, username: value }))}
          placeholder='Enter username...'
        />

        <CustomInput
          id='password'
          name='password'
          type='password'
          value={credentials.password}
          icon={<PasswordOutlined />}
          setValue={(value) => setCredentials((prev) => ({ ...prev, password: value }))}
          placeholder='Enter password...'
        />

        <CustomButton
          text='Register'
          icon={<LoginIcon />}
          type='submit'
        />
      </form>

      <div className='w-full text-blue-primary font-bold flex justify-center items-center p-2 gap-2 cursor-default'>
        <div className='w-full h-[1px] bg-blue-primary' />
        <CustomP textKey="or" uppercase={true} classname='text-center uppercase' />
        <div className='w-full h-[1px] bg-blue-primary' />
      </div>

      <CustomButton
        isDisabled={false}
        text='Back'
        icon={<ArrowBackRounded />}
        onclick={() => navigate(routes.getstarted.path)}
      />
    </div>
  )
}

export default SubmitForm
