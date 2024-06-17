"use client"

import { login, registerUser } from "@/actions"
import clsx from "clsx"
import Link from "next/link"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

type FormInputs = {
  name: string
  email: string
  password: string
}

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>()

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage("")
    const { email, name, password } = data
    const res = await registerUser(name, email, password)
    if (!res.ok) {
      return setErrorMessage(res.message)
    }
    await login(email.toLocaleLowerCase(), password)
    window.location.replace("/")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
      <label htmlFor='name'>Full name</label>
      <input
        {...register("name", { required: true })}
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": errors.name,
        })}
        type='text'
        autoFocus
      />

      <label htmlFor='email'>Email</label>
      <input
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": errors.email,
        })}
        type='email'
      />

      <label htmlFor='password'>Password</label>
      <input
        {...register("password", { required: true, minLength: 6 })}
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500 !mb-2": errors.password,
        })}
        type='password'
      />
      {errors.password && (
        <span className='text-red-500 mb-4 text-sm'>
          *Password must be 6 characters long
        </span>
      )}
      {errorMessage && (
        <span className='text-red-500 mb-4 text-sm'>{errorMessage}</span>
      )}

      <button className='btn-primary'>Create account</button>

      {/* divisor l ine */}
      <div className='flex items-center my-5'>
        <div className='flex-1 border-t border-gray-500'></div>
        <div className='px-2 text-gray-800'>Or</div>
        <div className='flex-1 border-t border-gray-500'></div>
      </div>

      <Link href='/auth/login' className='btn-secondary text-center'>
        Sign In
      </Link>
    </form>
  )
}
