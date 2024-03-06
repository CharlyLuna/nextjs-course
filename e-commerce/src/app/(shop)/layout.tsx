import { Footer, Sidebar, Slideshow, TopMenu } from "@/components"

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <TopMenu />
      <Sidebar />
      <main className='h-screen pt-14'>
        <div className='md:px-5 h-full overflow-auto'>
          {children}
          <Footer />
        </div>
      </main>
    </>
  )
}
