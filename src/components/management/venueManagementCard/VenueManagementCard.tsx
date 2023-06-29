'use client'
import { FC } from 'react'
import styles from './VenueManagementCard.module.css'
import { Venue } from '@prisma/client'
import Image from 'next/image'
import { getRating } from '@/components/homePage/VenueCard'

interface Props {
venue : Venue
}



const VenueManagementCard:FC<Props> = (props) => {
  const rating = getRating(props.venue.averageRating)

  const verified = props.venue.isVerified ? 'Verified' : 'Not Verified'

  return (
    <>
    <div className={styles.container}>
      <Image src={props.venue.photo} alt={props.venue.name} width={1000} height={1000}/>
      <h1 className={styles.name}>{props.venue.name}</h1>

      <div className={styles.ratingAndReviews}>
        <div className={styles.rating}>{rating}</div>
        <p className={styles.reviews}> xyz reviews</p>
      </div>

      <h1>{verified}</h1>

    </div>
    </>
  )
}

export default VenueManagementCard
