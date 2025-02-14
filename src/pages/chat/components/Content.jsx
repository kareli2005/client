import React, { useEffect, useRef, useState } from 'react'
import MessageBox from './MessageBox'
import ContentHead from './ContentHead'
import TranslateText from '../../../components/TranslateText'

const Content = ({ secondUser, userData, messages }) => {
  const messagesEndRef = useRef(null)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    if (!hasScrolled) {
      messagesEndRef.current?.scrollIntoView()
      setHasScrolled(true)
    }
  }, [messages, hasScrolled])

  return (
    <div className='w-full h-auto px-16 flex flex-col justify-end items-center gap-2 flex-1'>
      <ContentHead isMessage={messages.length == 0} secondUser={secondUser} />
      {
        messages.length == 0 ? <p className='text-blue-primary font-bold text-xl'>{TranslateText('No Messages')}</p> :
          messages.map((message, index) => (
            <MessageBox message={message} userData={userData} secondUser={secondUser} key={index} />
          ))
      }
      <div ref={messagesEndRef} />
    </div>
  )
}

export default Content
