"use client"
import { startTransition, useOptimistic } from "react"
import { Todo } from "@prisma/client"
import styles from "./TodoItem.module.css"
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5"

interface Props {
  todo: Todo
  updateTodo: (id: string, complete: boolean) => Promise<Todo | void>
}

export const TodoItem = ({ todo, updateTodo }: Props) => {
  const [todoOptimistic, updateTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({
      ...state,
      complete: newCompleteValue,
    })
  )

  const onToggleTodo = async () => {
    try {
      startTransition(() => updateTodoOptimistic(!todoOptimistic.complete))

      await updateTodo(todoOptimistic.id, !todoOptimistic.complete)
    } catch (e) {
      startTransition(() => updateTodoOptimistic(!todoOptimistic.complete))
    }
  }

  return (
    <div
      className={todoOptimistic.complete ? styles.todoDone : styles.todoPending}
    >
      <div className='flex flex-col sm:flex-row justify-start items-center gap-4'>
        <button
          // onClick={() =>
          //   updateTodo(todo.id, !todo.complete)
          // }
          onClick={onToggleTodo}
          className={`flex p-2 rounded-md hover:bg-opacity-70 ${
            todoOptimistic.complete ? "bg-blue-100" : "bg-red-100"
          } `}
        >
          {todoOptimistic.complete ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </button>
        <div className='text-center sm:text-left'>
          {todoOptimistic.description}
        </div>
      </div>
    </div>
  )
}
