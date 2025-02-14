import React from 'react'
import TranslateText from '../../../components/TranslateText'
import CustomP from '../../../components/CustomP'
import { useSystemMessage } from '../../../context/SystemMessageContext'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

const Credential = ({ value, label }) => {

  const { setMessage } = useSystemMessage()

  const thisFunctionWillAddSoon = () => {
    setMessage('error', 'This function will add soon.')
  }

  return (
    <div className='bg-white px-6 py-4 rounded-xl h-full w-full flex justify-between items-center gap-2 shadow-lg shadow-gray-300'>
      <div className='w-full flex items-center justify-start text-nowrap overflow-x-auto scrollbar-hidden'>
        <p className='flex gap-2 text-center text-base'>
          {TranslateText(label)}: <span className='text-[#0074d9] overflow-hidden text-ellipsis'>{value}</span>
        </p>
      </div>
      <button onClick={thisFunctionWillAddSoon} className='flex gap-1 justify-center items-center hover:underline cursor-pointer'>
        <DriveFileRenameOutlineIcon className='max-w-[18px] max-h-[18px]' />
        <CustomP textKey={'Change'} />
      </button>
    </div>
  )
}

export default Credential
