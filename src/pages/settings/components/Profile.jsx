import React from 'react'
import CustomP from '../../../components/CustomP'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges'
import DeleteIcon from '@mui/icons-material/Delete'
import { useSystemMessage } from '../../../context/SystemMessageContext'


const Profile = ({ userData }) => {

  const { setMessage } = useSystemMessage()

  const thisFunctionWillAddSoon = () => {
    return setMessage('error', 'This function will add soon...')
  }

  return (
    <div className='h-[160px] min-w-[160px] min-h-[160px] md:min-w-[200px] md:min-h-[200px] aspect-square flex rounded-xl overflow-hidden p-2 bg-white duration-300 relative shadow-lg shadow-gray-300'>
      <div className='w-full h-full absolute duration-300 top-0 left-0 opacity-0 hover:opacity-100 text-white font-bold text-sm flex flex-col justify-center items-center gap-4' style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }} >
        <button onClick={thisFunctionWillAddSoon} className='w-4/5 select-none flex gap-1 border-2 rounded-xl border-blue-primary bg-blue-primary-tr hover:bg-blue-primary bg-opacity-60 hover:bg-opacity-100 duration-300 p-2 justify-start items-center cursor-pointer'>
          <PublishedWithChangesIcon />
          <CustomP textKey={'Update'} />
        </button>
        <button onClick={thisFunctionWillAddSoon} className='w-4/5 select-none flex gap-1 border-2 rounded-xl border-red-600 bg-red-primary-tr hover:bg-red-600 bg-opacity-60 hover:bg-opacity-100 duration-300 p-2 justify-start items-center cursor-pointer'>
          <DeleteIcon />
          <CustomP textKey={'Delete'} />
        </button>
      </div>
      <img src={userData.image} alt="/user_profile" className='rounded-xl w-full h-full flex object-cover' />
    </div>
  )
}

export default Profile