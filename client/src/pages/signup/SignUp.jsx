import React, { useState } from 'react'
import GenderCheckBox from './GenderCheckBox'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup'

const SignUp = () => {

  const [ inputs , setInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: ''
  })

 const {loading , signup} = useSignup()

  const handleCheckBoxChange = (gender) =>{
    setInputs({...inputs, gender})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    console.log(inputs);
    await signup(inputs)
  }
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='p-2 h-full w-full bg-blue-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
      <h1 className='text-3xl font-semibold text-center text-white-300'>SignUp</h1>

      <form onSubmit={handleSubmit}>
      <div className='p-2 mt-3'>
               
               <input type="text" placeholder='Fullname' className='w-full input input-bordered h-10' 
               value={inputs.fullName}
               onChange={(e)=>setInputs({...inputs,fullName:e.target.value})}
               />
           </div>
            <div className='p-2 '>
               
                <input type="text" placeholder='username' className='w-full input input-bordered h-10' 
                 value={inputs.username}
                 onChange={(e)=>setInputs({...inputs,username:e.target.value})}
                />
            </div>
            <div className='p-2'>
               
               <input type="password" placeholder='password' className=' w-full input input-bordered h-10'
                 value={inputs.password}
                 onChange={(e)=>setInputs({...inputs,password:e.target.value})}
                />
           </div>
           <div className='p-2'>
               
               <input type="password" placeholder='Confirm Password' className=' w-full input input-bordered h-10'
                 value={inputs.confirmPassword}
                 onChange={(e)=>setInputs({...inputs,confirmPassword:e.target.value})}
               />
           </div>

         <GenderCheckBox onCheckBoxChange = {handleCheckBoxChange} selectedGender ={inputs.gender} />

           <Link to="/login" className='ms-1 text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>{"Already"} have an account ?</Link>

           <div>
            <button  className='btn btn-block btn-sm mt-2' 
            disabled={loading}
            >
              {loading ? <span className='loading loading-spinner'></span> : "SignUp"}
            </button>
           </div>
        </form>

      </div>
    </div>
  )
}

export default SignUp