import React from 'react'
import { auth, provider } from '../../config/firebase'
import { FaGoogle } from "react-icons/fa";
import { signInWithPopup } from 'firebase/auth';
import {useNavigate, Navigate} from 'react-router-dom'
import { useGetUserInfo } from '../../hooks/useGetUserInfo'

function Auth() {

    const navigate = useNavigate()
    const { isAuth } = useGetUserInfo()

    const signInWithGoogle = async () => {
        const results = await signInWithPopup(auth, provider)
        const authSatus = {
            userId: results.user.uid,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true,
        }
        localStorage.setItem("auth", JSON.stringify(authSatus))
        console.log(results)
        navigate('/expense-tracker')
    }

    if(isAuth){
        return <Navigate to="/expense-tracker"/>
    }

  return (
    <div className='w-full bg-back h-screen flex items-center justify-center'>
        <div className='bg-turqoise text-white rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 space-y-6 flex-col justify-center items-center'>
            <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUuAXHny5mj24BU4bA6EXilF9i1QPuk96Anw&s" alt="Expense Tracker" className=''/>
            <h1 className='text-white text-2xl font-bold mx-5 text-center'>Expense Tracker</h1>
            </div>
            <div className='mx-4 text-center'>
            <button className='flex text-white bg-black rounded-xl p-2' onClick={signInWithGoogle}>
                <div className='p-1'>
                <FaGoogle/>
                </div>
                Sign Up With Google 
            </button>
            </div>
            
        </div>
    </div>
  )
}

export default Auth