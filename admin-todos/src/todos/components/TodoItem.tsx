"use client"
import { Todo } from "@prisma/client"
import styles from "./TodoItem.module.css"
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5"

interface Props {
  todo: Todo
  updateTodo: (id: string, complete: boolean) => Promise<Todo | void>
}

export const TodoItem = ({ todo, updateTodo }: Props) => {
  return (
    <div className={todo.complete ? styles.todoDone : styles.todoPending}>
      <div className='flex flex-col sm:flex-row justify-start items-center gap-4'>
        <button
          onClick={() => updateTodo(todo.id, !todo.complete)}
          className={`flex p-2 rounded-md hover:bg-opacity-70 ${
            todo.complete ? "bg-blue-100" : "bg-red-100"
          } `}
        >
          {todo.complete ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </button>
        <div className='text-center sm:text-left'>{todo.description}</div>
      </div>
    </div>
  )
}
