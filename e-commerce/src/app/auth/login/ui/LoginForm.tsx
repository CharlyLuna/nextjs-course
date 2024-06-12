"use client"
import Link from "next/link"
import { useFormState } from "react-dom"
import { authenticate } from "@/actions"

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined)
  return (
    <form action={dispatch} className='flex flex-col'>
      <label htmlFor='email'>Email</label>
      <input
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        type='email'
        name='email'
      />

      <label htmlFor='password'>Password</label>
      <input
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        type='password'
        name='password'
      />

      <button type='submit' className='btn-primary'>
        Enter
      </button>

      {/* divisor l ine */}
      <div className='flex items-center my-5'>
        <div className='flex-1 border-t border-gray-500'></div>
        <div className='px-2 text-gray-800'>Or</div>
        <div className='flex-1 border-t border-gray-500'></div>
      </div>

      <Link href='/auth/new-account' className='btn-secondary text-center'>
        Create new account
      </Link>
    </form>
  )
}
