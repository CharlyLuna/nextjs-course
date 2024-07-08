"use client"
import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperObject } from "swiper"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"

import "./slideshow.css"

import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules"
import Image from "next/image"
import { ProductImage } from "../product-image/ProductImage"
import { redirect } from "next/navigation"

interface Props {
  images: string[]
  title: string
  className?: string
}

export const Slideshow = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>()

  if (images.length === 0)
    return (
      <div
        className={`${className} text-center h-[50vh] border border-gray-300`}
      >
        <h1 className='text-3xl text-gray-400'>No images available</h1>
      </div>
    )

  return (
    <div className={className}>
      <Swiper
        spaceBetween={10}
        navigation={true}
        autoplay={{ delay: 3000 }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className='mySwiper2'
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <ProductImage
              src={image}
              alt={title}
              height={800}
              width={1024}
              className='rounded-lg object-fill'
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper'
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <ProductImage
              src={image}
              alt={title}
              height={300}
              width={300}
              className='rounded-lg object-fill'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
