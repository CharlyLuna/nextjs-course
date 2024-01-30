"use client"

import { FormEvent, useState } from "react"
import { IoTrashOutline } from "react-icons/io5"
import { createTodo, deleteTodos } from "../helpers/todos"
import { useRouter } from "next/navigation"

export const NewTodo = () => {
  const [description, setDescription] = useState("")
  const router = useRouter()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (description.trim().length < 2) return

    createTodo(description)
    setDescription("")
    router.refresh()
  }

  const deleteCompleted = async () => {
    await deleteTodos()
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className='flex w-full'>
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        type='text'
        className='w-6/12 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all'
        placeholder='¿Qué necesita ser hecho?'
      />

      <button
        type='submit'
        className='flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all'
      >
        Crear
      </button>

      <span className='flex flex-1'></span>

      <button
        onClick={() => deleteCompleted()}
        type='button'
        className='flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all'
      >
        <IoTrashOutline />
        Delete completed
      </button>
    </form>
  )
}
