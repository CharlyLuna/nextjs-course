"use client"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"

import "./slideshow.css"

import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules"
import Image from "next/image"
import { ProductImage } from "../product-image/ProductImage"

interface Props {
  images: string[]
  title: string
  className?: string
}

export const MobileSlideShow = ({ images, title, className }: Props) => {
  if (images.length === 0)
    return (
      <div
        className={`${className} text-center text h-[50vh] border border-gray-300`}
      >
        <h1 className='text-3xl text-gray-400'>No images available</h1>
      </div>
    )

  return (
    <div className={className}>
      <Swiper
        style={{
          height: "700px",
        }}
        pagination
        autoplay={{ delay: 3000 }}
        modules={[FreeMode, Pagination, Autoplay]}
        className='mySwiper2'
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <ProductImage
              src={image}
              alt={title}
              height={500}
              width={600}
              className='object-fill'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
