export const updateTodo = async (id: string, complete: boolean) => {
  const body = { complete }
  const res = await fetch(`/api/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
  const todo = await res.json()
  return todo
}

export const createTodo = async (description: string) => {
  const body = { description }
  const res = await fetch("/api/todos/", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
  const todo = await res.json()
  return todo
}
