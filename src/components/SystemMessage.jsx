import React, { useState, useEffect } from 'react'
import { useSystemMessage } from '../context/SystemMessageContext'
import { IconButton } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { motion } from 'framer-motion'
import CustomP from './CustomP'

const SystemMessage = () => {
  const { messageType, messageText, update } = useSystemMessage()
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    if (messageType && messageText) {
      setShowMessage(true)

      const timer = setTimeout(() => {
        setShowMessage(false)
      }, 10000)

      return () => clearTimeout(timer)
    }
  }, [update, messageType, messageText])

  const getStyle = () => {
    switch (messageType) {
      case 'error':
        return 'bg-red-600'
      case 'success':
        return 'bg-green-500'
      default:
        return ''
    }
  }

  const handleCancel = () => {
    setShowMessage(false)
  }

  return (
    <motion.div
      key={update}
      className={`absolute top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[500px] rounded-full flex items-center justify-between text-white p-2 z-50 ${getStyle()}`}
      initial={{ translateY: -60, opacity: 0, scale: 1 }}
      animate={{
        translateY: showMessage ? 0 : -60,
        opacity: showMessage ? 1 : 0,
        scale: showMessage ? 1 : 0.5,
      }}
      transition={{ duration: 0.3 }}
      onAnimationComplete={() => {
        if (!showMessage) {
          setShowMessage(false)
        }
      }}
    >
      <CustomP textKey={messageText || (messageType === 'error' ? 'Error occurred!' : 'Success Message')} classname={'pl-2'} />
      <IconButton onClick={handleCancel} color='inherit'>
        <CloseIcon />
      </IconButton>
    </motion.div>
  )
}

export default SystemMessage
