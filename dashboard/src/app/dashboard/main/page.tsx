import { SimpleWidget, WidgetsGrid } from "@/components"

export const metadata = {
  title: "Dashboard data",
  description: "Page to watch the general information",
}

export default function MainPage() {
  return (
    <div className='text-black p-2'>
      <h1>Dashboard</h1>
      <span className='text-xl'>General information</span>
      <WidgetsGrid />
    </div>
  )
}
