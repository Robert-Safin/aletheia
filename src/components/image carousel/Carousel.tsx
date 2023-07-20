'use client'
import { FC } from 'react'
import styles from './Carousel.module.css'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Photo } from '@prisma/client';
import Image from 'next/image';


interface Props {
  photos: Photo[]
}

const ImageCarousel:FC<Props> = (props) => {


  return (
    <Carousel className={styles.carousel} showThumbs={false}>
    {props.photos.map((photo, index) => (
      <div key={index}>
        <Image className={styles.photo} src={photo.url} alt={`photo`} width={1000} height={1000} />
      </div>
    ))}
  </Carousel>
  )

}

export default ImageCarousel
