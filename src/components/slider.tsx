import React from 'react'
import '../App.css'
// import Swiper core and required modules
import {Pagination} from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


let images = [
  {
    imageUrl:`https://about.bankofamerica.com/content/dam/about/images/notched-image/working-here/gettyimages-688415194@2x.jpg`
  },
  {
    imageUrl:`https://about.bankofamerica.com/content/dam/about/images/notched-image/working-here/gettyimages-638906180-2x.jpg`
  },
  {
    imageUrl:`https://about.bankofamerica.com/content/dam/about/images/notched-image/working-here/hcm-pride@2x.jpg`
  }
]

const Slider = () => {
  return (
    <main>
    <section id="slide-container">

      <Swiper className='slide-container'
      // install Swiper modules
      modules={[Pagination]}
      slidesPerView={1}
      pagination={{ clickable: true }}>
      {
        images.map(({imageUrl}, index)=>{
          return(
            <SwiperSlide key={index} className='image-container'>
             <div className="image-container">
                 <img src={imageUrl} id="image1" alt="slideImg1" />
            </div>
          </SwiperSlide>
          )
        })
      }
      </Swiper>
    </section>
    </main>
  )
}

export default Slider