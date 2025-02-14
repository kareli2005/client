import React from 'react'
import CustomButton from '../../../components/CustomButton'
import { ArrowBackRounded } from '@mui/icons-material'
import routes from '../../../routes'
import { useNavigate } from 'react-router-dom'

const Head = ({ email }) => {


  const navigate = useNavigate()

  return (
    <div className='w-full h-auto flex justify-between gap-2 absolute top-0 left-0 z-30'>
      <div>
        <CustomButton
          isDisabled={false}
          icon={<ArrowBackRounded />}
          onclick={() => navigate(routes.home.children.chats.path)}
          animation={false}
          small={true}
        />
      </div>

      <div className='bg-white border-2 rounded-xl border-blue-primary text-blue-primary px-2 py-1 text-center shadow-lg overflow-x-scroll scrollbar-hidden'>
        {email}
      </div>
    </div>
  )
}

export default Head