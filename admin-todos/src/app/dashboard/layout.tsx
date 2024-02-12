import { Sidebar, TopMenu } from "@/components"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Sidebar />

      <div className='ml-auto lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen'>
        <TopMenu />
        <div className='bg-white p-6 m-4 rounded-md'>{children}</div>
      </div>
    </>
  )
}
