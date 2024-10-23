import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../skeletons/MessageSkeleton'
import useListenMessages from '../../hooks/useListenMessages'

const Messages = () => {
  const {loading,messages} = useGetMessages()
  // console.log(messages);
  useListenMessages();
 const lastMessageRef = useRef()
useEffect(()=>{
  setTimeout(()=>{
    lastMessageRef.current?.scrollIntoView({behavior : 'smooth'})
  },100)
},[messages])

  return (
    <div className='px-4 flex-1  overflow-auto'>

        {/* <Message/> */}

        {!loading && messages.length > 0 && messages.map((message) =>(
         <div key={message._id}  ref={lastMessageRef}>
           <Message message={message} />
         </div>
        ))}

        {loading && [...Array(4)].map((_,index) => <MessageSkeleton key={index}/>)}

        {!loading && messages.length === 0 && (<p className='text-center opacity-60 mt-40'>Send a message to start conversation</p>)}
     
    

    </div>
  )
}

export default Messages