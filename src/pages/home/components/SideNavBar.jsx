import React, { useEffect, useState } from 'react'
import Logo from '../../../assets/together-blue-transparent.png'
import { useLocation, useNavigate } from 'react-router-dom'
import routes from '../../../routes'
import { useLanguage } from '../../../context/LanguageContext'
import TranslateText from '../../../components/TranslateText'

const SideNavBar = () => {
  const { language, switchLanguage } = useLanguage()
  const [pathname, setPathname] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setPathname(location.pathname)
  }, [location.pathname])

  return (
    <div className='hidden md:flex flex-col bg-white rounded-lg py-4 px-6 w-full gap-8 max-w-[220px] shadow-lg shadow-gray-300 side-navbar-enter'>
      <img src={Logo} alt='together-blue-transparent.png' className='w-full' />

      <div className='flex flex-col gap-4 h-full'>
        {Object.values(routes.home.children).map((route, key) => {
          if (!route.name) return

          return <button
            key={key}
            onClick={() => navigate(route.path)}
            className={`${pathname === route.path
              ? 'bg-blue-primary border-blue-primary text-white'
              : 'bg-white border-blue-primary text-blue-primary hover:pl-8'
              } duration-300 border-2 rounded-xl px-3 py-2 font-bold w-full select-none flex justify-start items-center gap-2 shadow-md shadow-gray-300 cursor-pointer`}
          >
            {route.icon}
            <p>{TranslateText(route.name)}</p>
          </button>
        })}

        <div className='w-full h-full flex items-end'>
          <button
            onClick={() => {
              language === 'ka' ? switchLanguage('en') : switchLanguage('ka')
            }}
            className='bg-white border-blue-primary text-blue-primary hover:bg-blue-primary hover:text-white hover:pl-8 duration-300 border-2 rounded-xl px-3 py-2 font-bold w-full select-none flex justify-start items-center gap-2 shadow-md shadow-gray-300 cursor-pointer'
          >
            {TranslateText(language)}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SideNavBar
