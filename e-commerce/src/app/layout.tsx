import type { Metadata } from "next"
import "./globals.css"
import { inter } from "@/config/fonts"
import { Provider } from "@/components"

export const metadata: Metadata = {
  title: {
    template: "%s - Ecommerce | App",
    default: "Home - Ecommerce | App",
  },
  description: "E-commerce app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
