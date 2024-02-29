"use client"
import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperObject } from "swiper"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"

import "./slideshow.css"

import { FreeMode, Navigation, Thumbs } from "swiper/modules"
import Image from "next/image"

interface Props {
  images: string[]
  title: string
  className?: string
}

export const Slideshow = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>()

  return (
    <div className=''>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper2'
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              src={`/products/${image}`}
              alt={title}
              height={980}
              width={1024}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
