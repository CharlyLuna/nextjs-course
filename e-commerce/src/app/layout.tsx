import type { Metadata } from "next"
import "./globals.css"
import { inter } from "@/config/fonts"
import { Providers } from "@/components"

export const metadata: Metadata = {
  title: {
    template: "%s - E-SHOP | App",
    default: "Home - E-SHOP | App",
  },
  description: "E-SHOP App",
  openGraph: {
    title: "E-SHOP | App",
    description: "E-SHOP web application for shopping",
    images: ["/imgs/starman_750x750.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
