'use client'
import styles from './UnverifiedVenueManagementCard.module.css'

import { FC } from 'react'
import { Venue } from '@prisma/client'
import Image from 'next/image'
import { getRating } from '@/components/homePage/VenueCard'
import { AiOutlineClockCircle } from 'react-icons/ai'

interface Props {
venue : Venue
}



const UnverifiedVenueManagementCard:FC<Props> = (props) => {
  const rating = getRating(props.venue.averageRating)


  return (
    <>
    <div className={styles.container}>
      <Image className={styles.photo} src={props.venue.mainPhoto} alt={props.venue.name} width={1000} height={1000}/>
      <h1 className={styles.name}>{props.venue.name}</h1>

      <div className={styles.iconAndStatus}>
        <AiOutlineClockCircle/>
        <p>Status: Awaiting Review</p>
      </div>
      <button className={styles.cancel}>CANCEL REQUEST</button>
    </div>
    </>
  )
}

export default UnverifiedVenueManagementCard
