"use client"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"

import "./slideshow.css"

import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules"
import Image from "next/image"

interface Props {
  images: string[]
  title: string
  className?: string
}

export const MobileSlideShow = ({ images, title, className }: Props) => {
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
            <Image
              src={`/products/${image}`}
              alt={title}
              height={500}
              width={600}
              className='object-fill'
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
