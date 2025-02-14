import React from 'react'
import { useNavigate } from 'react-router-dom'
import routes from '../../../routes'

const Chat = ({ chat }) => {

  const navigate = useNavigate()

  const handleOpenChat = () => {
    const url = routes.home.children.chats.path + '/' + chat.id
    navigate(url)
  }

  return (
    <div onClick={() => handleOpenChat()} className='w-full bg-white rounded-xl p-4 flex gap-4 cursor-pointer relative shadow-lg shadow-gray-300 hover:scale-95 duration-300'>
      <div className='max-h-14 max-w-14 w-full h-full'>
        <img src={chat.other_user.image} alt="/userProfile" className='w-full h-full rounded-lg bg-slate-400 object-cover shadow-md shadow-gray-300' />
      </div>
      <div className='w-full flex flex-col justify-between'>
        <p className='font-bold text-[#0074d9] md:text-lg'>{chat.other_user.email}</p>
        <p className='text-slate-500 text-sm md:text-base'><span className='font-bold'>{chat.sender == chat.current_user_name ? 'You' : chat.sender}</span>: {chat.last_message.slice(0, 12) + '...'}</p>
      </div>
      <div className={`${chat.seen ? 'hidden' : 'flex'} absolute top-2 right-2 py-1 px-2 bg-[#0074d9] rounded-xl text-white text-xs md:text-base`}>
        New
      </div>
    </div>
  )
}

export default Chat