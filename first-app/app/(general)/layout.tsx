import { Navbar } from "@/components"

export default function GeneralLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className='flex flex-col items-center p-24'>
        <h1>Hello Root Layout About</h1>
        {children}
      </main>
    </>
  )
}
