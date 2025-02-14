import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import routes from '../../../routes'
import ChatIcon from '@mui/icons-material/Chat'
import SearchIcon from '@mui/icons-material/Search'
import SettingsIcon from '@mui/icons-material/Settings'

const MobileNavBar = () => {

  const [pathname, setPathname] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setPathname(location.pathname)
  }, [location.pathname])

  return (
    <div className='md:hidden flex bg-white rounded-t-xl justify-around items-center p-3 mobile-navbar-enter'>
      <button onClick={() => navigate(routes.home.children.chats.path)} className={`${pathname === routes.home.children.chats.path ? 'scale-110 bg-blue-primary text-white' : 'bg-slate-200 text-blue-prbg-blue-primary hover:text-white hover:bg-slate-400'} shadow-md shadow-gray-300 p-4 w-14 h-14 rounded-full duration-300 cursor-pointer`}>
        <ChatIcon />
      </button>
      <button onClick={() => navigate(routes.home.children.search.path)} className={`${pathname === routes.home.children.search.path ? 'scale-110 bg-blue-primary text-white' : 'bg-slate-200 text-blue-prbg-blue-primary hover:text-white hover:bg-slate-400'} shadow-md shadow-gray-300 p-4 w-14 h-14 rounded-full duration-300 cursor-pointer`}>
        <SearchIcon />
      </button>
      <button onClick={() => navigate(routes.home.children.settings.path)} className={`${pathname === routes.home.children.settings.path ? 'scale-110 bg-blue-primary text-white' : 'bg-slate-200 text-blue-prbg-blue-primary hover:text-white hover:bg-slate-400'} shadow-md shadow-gray-300 p-4 w-14 h-14 rounded-full duration-300 cursor-pointer`}>
        <SettingsIcon />
      </button>
    </div>
  )
}

export default MobileNavBar