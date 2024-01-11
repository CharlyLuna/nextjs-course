import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About page",
  description: "This is the about page",
  keywords: ["Next.js", "First App", "About Page"],
}

const AboutPage = () => {
  return (
    <>
      <h1 className='text-4xl'>About page</h1>
    </>
  )
}

export default AboutPage
