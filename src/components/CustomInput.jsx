import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import TranslateText from './TranslateText'

const CustomInput = ({ placeholder, type, icon, name, id, value, setValue, disabled, style }) => {
  const [show, setShow] = useState(false)

  return (
    <div className={`duration-300 border-2 border-blue-primary rounded-xl px-3 py-2 w-full flex justify-start items-center gap-2 max-h-[44px] ${style}`}>
      {icon}
      <input
        disabled={disabled}
        placeholder={TranslateText(placeholder)}
        type={show ? 'text' : type}
        name={name}
        id={id}
        value={value}
        autoComplete={type === 'password' ? 'current-password' : 'off'}
        onChange={(e) => setValue(e.target.value)}
        className='text-slate-500 outline-none h-full w-full'
      />
      {type === 'password' && (
        show
          ? <VisibilityIcon onClick={() => setShow(false)} className='text-slate-400 cursor-pointer hover:text-blue-primary duration-300' />
          : <VisibilityOffIcon onClick={() => setShow(true)} className='text-slate-400 cursor-pointer hover:text-blue-primaryduration-300' />
      )}
    </div>
  )
}

export default CustomInput