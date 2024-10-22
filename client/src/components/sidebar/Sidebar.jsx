import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogoutButton from './LogoutButton'

const Sidebar = () => {
  return (
  <>
      <div className='border-r border-slate-500 p-4 flex-col'>
          <SearchInput/>
          <div className='divider px-3'></div>
          <div className='h-72 overflow-auto'><Conversations/></div>
          <LogoutButton/>
      </div>
  </>
  )
}

export default Sidebar