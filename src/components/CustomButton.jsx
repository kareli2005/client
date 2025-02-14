import React from 'react'
import CustomP from './CustomP'

const CustomButton = ({ isDisabled, onclick, text, disabledText, icon, disabledIcon, type, red, animation = true, small = false }) => {
  return (
    <button
      type={type}
      onClick={isDisabled ? null : onclick}
      className={`${isDisabled ? 'bg-red-600 border-red-600 cursor-default text-white' : red ? 'bg-white border-red-600 text-red-600 hover:bg-red-600 hover:text-white cursor-pointer' : 'bg-white border-blue-primary text-blue-primary hover:bg-blue-primary hover:text-white cursor-pointer'} ${animation ? 'hover:pl-8' : ''} ${small ? 'px-2 py-1 gap-1' : 'px-3 py-2 gap-2'} max-h-[44px] duration-300 border-2 rounded-xl font-bold w-full select-none flex justify-start items-center text-nowrap`}
    >
      {isDisabled ? disabledIcon : icon}
      {text && <CustomP textKey={isDisabled ? disabledText : text} />}
    </button>
  )
}

export default CustomButton