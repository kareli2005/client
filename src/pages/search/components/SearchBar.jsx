import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ placeholder, value, setValue, searchFunction }) => {
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      searchFunction()
    }}
      className='duration-300 bg-white rounded-xl px-3 py-2 w-full flex justify-start items-center gap-2 shadow-lg shadow-gray-300'>
      <input
        placeholder={placeholder}
        name={'name'}
        id={'search'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='text-slate-500 outline-none h-full w-full'
      />
      <button type='submit'>
        <SearchIcon className='text-blue-primary cursor-pointer hover:scale-110 duration-300' />
      </button>
    </form>
  )
}

export default SearchBar