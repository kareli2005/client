
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import routes from '../../../routes'
import { useUserData } from '../../../context/UserDataContext'

const SearchedUser = ({ user }) => {

  const navigate = useNavigate()
  const { userData } = useUserData()

  const getChatId = () => {
    return user.id < userData.id ? user.id + '_' + userData.id : userData.id + '_' + user.id
  }

  const handleOpenChat = () => {
    const chatId = getChatId()
    const url = routes.home.children.chats.path + '/' + chatId
    navigate(url)
  }
  return (
    <div onClick={() => handleOpenChat()} className='w-full bg-white rounded-xl p-4 flex gap-4 cursor-pointer relative shadow-lg shadow-gray-300 hover:hover:scale-95 duration-300 home-container-enter'>
      <img src={user.image} alt="/userProfile" className='w-14 h-14 rounded-lg bg-slate-400' />
      <div className='w-full flex flex-col justify-between'>
        <p className='font-bold text-[#0074d9] md:text-lg'>{user.email}</p>
        <p className='font-bold text-[#0074d9] md:text-lg'>{user.username}</p>
      </div>
      <div className={`${user.status ? 'bg-green-600' : 'bg-blue-primary'} absolute top-2 right-2 py-1 px-2 rounded-xl text-white text-xs md:text-base`}>
        {user.status ? 'Online' : 'Offline'}
      </div>
    </div>
  )
}

export default SearchedUser
