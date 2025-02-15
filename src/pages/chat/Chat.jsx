import React, { useEffect, useState, useRef } from 'react'
import Head from './components/Head'
import Inputbar from './components/Inputbar'
import Content from './components/Content'
import { useSystemMessage } from '../../context/SystemMessageContext'
import httpClient from '../../utils/httpClient'
import { CircularProgress } from '@mui/material'
import { useUserData } from '../../context/UserDataContext'

const Chat = () => {
  const { setMessage } = useSystemMessage()
  const { userData } = useUserData()

  const [secondUser, setSecondUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [chatId, setChatId] = useState('')
  const [lastFetched, setLastFetched] = useState(Date.now())

  const messagesEndRef = useRef(null)

  const fetchChatData = async () => {
    const url = window.location.pathname
    const chat_id = url.split('/').pop()

    const chatParts = chat_id.split('_')

    if (chatParts.length !== 2) {
      setMessage('error', 'Invalid chat ID format. It should be in the format "user1Id_user2Id".')
      setIsLoading(false)
      return
    }

    const [user1Id, user2Id] = chatParts

    if (user1Id === user2Id) {
      setMessage('error', "You can't chat with yourself")
      setIsLoading(false)
      return
    }

    if (!chat_id) {
      setMessage('error', 'Invalid chat ID')
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    const errorMsg = 'Server Error, Please try again'
    setChatId(chat_id)

    try {
      const response = await httpClient.post('/home/get_chat', { chat_id: chat_id })
      if (response.status === 200) {
        setSecondUser(response.data.other_user)
        setMessages(response.data.messages)
      } else {
        setMessage('error', response.data.error || errorMsg)
      }
    } catch (error) {
      setMessage('error', error.response?.data?.error || errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchMessages = async () => {
    const currentTime = Date.now()
    const timeDifference = currentTime - lastFetched

    if (timeDifference < 1000) {
      return
    }

    if (!chatId) return

    try {
      const response = await httpClient.post('/home/get_chat', { chat_id: chatId })
      if (response.status === 200) {
        setMessages(response.data.messages)
        setLastFetched(currentTime)
      }
    } catch (error) {
      setMessage('error', 'Server Error, Please try again')
    }
  }

  const sendMessage = async (content) => {
    if (!chatId || !content) return

    const message = {
      sender: userData.id,
      receiver: secondUser.id,
      content: content,
    }

    try {
      await httpClient.post('/home/send_message', message)
    } catch (error) {
      setMessage('error', 'Message sending failed')
    }
  }

  useEffect(() => {
    fetchChatData()

    const interval = setInterval(() => {
      fetchMessages()
    }, 1000)

    return () => clearInterval(interval)
  }, [chatId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (isLoading) return <div className='absolute w-full h-full flex justify-center items-center z-50'><CircularProgress /></div>

  return (
    <div className="w-full h-full flex flex-col justify-start items-center bg-slate-200 gap-2">
      {secondUser && <Head email={secondUser.email} />}
      <div id="scrolldiv" className="w-full h-full overflow-y-auto scrollbar-hidden">
        <Content secondUser={secondUser} userData={userData} messages={messages} />
        <div ref={messagesEndRef} />
      </div>
      <Inputbar sendMessage={sendMessage} setMessages={setMessages} />
    </div>
  )
}

export default Chat
