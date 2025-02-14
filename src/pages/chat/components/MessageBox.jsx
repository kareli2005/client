import React from 'react'

const MessageBox = ({ message, userData, secondUser }) => {
  return (
    <div className={`${message.sender == userData.id ? 'items-end' : 'items-start'} w-full flex flex-col relative`}>
      <div className={`${message.sender == userData.id ? 'bg-blue-primary text-white' : 'bg-white text-gray-400'} px-2 py-1 md:px-3 md:py-2 md:text-base rounded-xl max-w-60 lg:max-w-120 cursor-default shadow-lg`}>
        {message.content}
      </div>
      {/* <p className='text-xs text-gray-400 py-1 px-2'>
        {message.date}
      </p> */}
      <img src={message.sender == userData.id ? userData.image : secondUser.image} className={`${message.sender == userData.id ? '-right-10' : '-left-10'} absolute top-0 h-8 w-8 rounded-full object-cover select-none shadow-lg`} />
    </div>
  )
}

export default MessageBox