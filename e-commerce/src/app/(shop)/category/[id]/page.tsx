import { notFound } from "next/navigation"

interface Props {
  params: {
    id: string
  }
}

const allowedRoutes = ["men", "women"]

export default function CategoryPage({ params }: Props) {
  const { id } = params

  if (!allowedRoutes.includes(id)) return notFound()

  return (
    <div>
      <h1>Category page {id}</h1>
    </div>
  )
}
