import React from 'react'
import CustomInput from '../../../components/CustomInput'
import CustomButton from '../../../components/CustomButton'
import SendIcon from '@mui/icons-material/Send'
import { useState } from 'react'

const Inputbar = ({ sendMessage, setMessages }) => {

  const [newMessage, setNewMessage] = useState('')

  const handleSend = (e) => {
    e.preventDefault()
    sendMessage(newMessage)
    setNewMessage('')
  }

  return (
    <form onSubmit={(e) => handleSend(e)} className='w-full flex gap-4 justify-center'>
      <CustomInput
        type='textarea'
        id='messageInput'
        name='messageInput'
        value={newMessage}
        setValue={setNewMessage}
        placeholder='Enter message...'
        style={'bg-white max-w-120 shadow-lg'}
      />
      <div>
        <CustomButton
          icon={<SendIcon />}
          animation={false}
          type={'submit'}
        />
      </div>
    </form>
  )
}

export default Inputbar