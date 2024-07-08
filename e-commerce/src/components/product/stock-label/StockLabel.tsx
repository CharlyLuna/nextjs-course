"use client"
import { getStockBySlug } from "@/actions/product/get-sotck-by-slug"
import { titleFont } from "@/config/fonts"
import { useEffect, useState } from "react"

interface Props {
  slug: string
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState<number>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const getStock = async () => {
      const stock = await getStockBySlug(slug)
      setStock(stock)
      setIsLoading(false)
    }
    getStock()
  }, [slug])

  return (
    <>
      {isLoading ? (
        <div className='text-lg animate-pulse bg-gray-200'>&nbsp;</div>
      ) : (
        <h2 className={`${titleFont.className} antialiased font-bold text-lg`}>
          Stock: {stock ?? "Loading..."}
        </h2>
      )}
    </>
  )
}
