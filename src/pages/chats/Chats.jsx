import React from 'react'
import ChatComponent from './components/Chat'
import { useChatsData } from '../../context/ChatsDataContext'
import TranslateText from '../../components/TranslateText'

const Chats = () => {

  const { chatsData } = useChatsData()

  return (
    <div className='w-full h-full rounded-xl home-container-enter flex flex-col gap-4 overflow-y-auto scrollbar-hidden home-container-enter'>
      {
        chatsData.length == 0 ? <div className='w-full h-full font-bold text-blue-primary flex justify-center items-center bg-white'>{TranslateText('You Have no chats yet')}</div> :
          chatsData.map((chat, key) => (
            <ChatComponent chat={chat} key={key} />
          ))
      }
    </div >
  )
}

export default Chats