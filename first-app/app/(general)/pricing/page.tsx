import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing page",
  description: "This is the pricing page",
}

export default function PricingPage() {
  return (
    <>
      <h1 className='text-4xl'>Pricing page</h1>
    </>
  )
}
