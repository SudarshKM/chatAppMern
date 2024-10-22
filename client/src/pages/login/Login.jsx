import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {loading, login} = useLogin()

    const handleSubmit = async (e)=>{
        e.preventDefault();
        await login(username, password)
    }
  return (
   <>
   <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
    <div className='p-2 h-full w-full bg-blue-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
        <h1 className='text-3xl font-semibold text-center text-white-300'>LogIn</h1>

        <form onSubmit={handleSubmit}>
            <div className='p-2 mt-3'>
               
                <input type="text" placeholder='username' className='w-full input input-bordered h-10' 
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                />
            </div>
            <div className='p-2'>
               
               <input type="password" placeholder='password' className=' w-full input input-bordered h-10' 
               value={password}
               onChange={(e)=>setPassword(e.target.value)}
               />
           </div>

           <Link to="/signup" className='ms-1 text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>{"Don't"} have an account ?</Link>

           <div>
            <button className='btn btn-block btn-sm mt-2' 
            disabled={loading}>
                {loading ? <span className='loading loading-spinner'></span> : "Login"}
            </button>
           </div>
        </form>
    </div>
   </div>
   </>
  )
}

export default Login