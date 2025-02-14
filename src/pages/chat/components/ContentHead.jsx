import React from 'react'

const ContentHead = ({ secondUser }) => {

  return (
    <div className='w-full h-auto flex flex-col justify-center items-center gap-4 pb-16'>
      <img src={secondUser.image} className='object-cover rounded-full w-28 h-28 sm:w-40 sm:h-40 bg-black shadow-2xl' />
      <p className='text-blue-primary'>{secondUser.email}</p>
      <p>{secondUser.userName}</p>
    </div>
  )
}

export default ContentHead