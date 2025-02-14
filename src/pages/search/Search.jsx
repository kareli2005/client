import React, { useEffect, useState } from 'react'
import SearchedUser from './components/SearchedUser'
import SearchBar from './components/SearchBar'
import CustomP from '../../components/CustomP'
import TranslateText from '../../components/TranslateText'
import httpClient from '../../utils/httpClient'
import { CircularProgress } from '@mui/material'
import { useSystemMessage } from '../../context/SystemMessageContext'

const Search = () => {

  const { setMessage } = useSystemMessage()

  const [searchWord, setSearchWord] = useState('')
  const [searchedData, setSearchedData] = useState([])
  const [defaultText, setDefaultText] = useState('Searched users will appear here...')
  const [isLoading, setIslLoading] = useState(false)

  useEffect(() => {
    if (!searchWord.trim()) {
      setDefaultText('Searched users will appear here...')
      setSearchedData([])
    }
  }, [searchWord])

  const searchUser = async () => {
    const trimmedWord = searchWord.trim().toLowerCase()

    if (!trimmedWord) {
      setDefaultText('Searched users will appear here...')
      setSearchedData([])
      return
    }
    setIslLoading(true)
    try {
      const response = await httpClient.post('/home/search', { query: trimmedWord })
      if (response.status === 200) {
        setSearchedData(response.data)
        setDefaultText('')
      } else {
        setSearchedData([])
        setDefaultText('No users found')
      }
    } catch (error) {
      setSearchedData([])
      setDefaultText('No users found')
    } finally {
      setIslLoading(false)
    }
  }

  return (
    <div className='relative w-full h-full flex flex-col gap-4 home-container-enter scrollbar-hidden'>
      <SearchBar
        placeholder={TranslateText('Type here...')}
        value={searchWord}
        setValue={setSearchWord}
        searchFunction={searchUser}
      />

      {
        isLoading && <div className='absolute w-full h-full flex justify-center items-center z-50'><CircularProgress /></div>
      }

      {!isLoading && searchedData.length === 0 ? (
        <div className='w-full h-full flex justify-center items-center'>
          <div className='w-full h-full max-h-[300px] text-center flex justify-center items-center bg-white rounded-xl text-lg duration-300 md:text-2xl font-bold text-[#0074d9] p-4 shadow-lg shadow-gray-300'>
            <CustomP textKey={defaultText} />
          </div>
        </div>
      ) : (
        <div className='w-full h-full overflow-y-auto overflow-x-hidden rounded-xl flex flex-col gap-4 scrollbar-thin scrollbar-webkit'>
          {searchedData.map((user) => (
            <SearchedUser user={user} key={user.id} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Search
