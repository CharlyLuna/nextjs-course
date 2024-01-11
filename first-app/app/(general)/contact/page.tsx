import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact page",
  description: "This is the contact page",
}

export default function ContactPage() {
  return (
    <>
      <h1 className='text-4xl'>Contact page</h1>
    </>
  )
}
