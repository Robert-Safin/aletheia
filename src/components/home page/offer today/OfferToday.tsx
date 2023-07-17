import { FC } from 'react'
import styles from './OfferToday.module.css'
import { Offer, Venue } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  offer: Offer & {
    venue: Venue
  }
}

const OfferToday:FC<Props> = (props) => {
  const formatStartTime = props.offer.startTime.slice(0, 5)

  return (
    <div>
      <Link href={`/${props.offer.venue.id}/offer/${props.offer.id}`}>
      <Image className={styles.photo} src={props.offer.photo} alt={props.offer.name} width={1000} height={1000}/>
      </Link>

        <h1 className={styles.offerName}>{props.offer.name}</h1>
        <p className={styles.venueName}>{props.offer.venue.name}</p>
        <p className={styles.times}>{formatStartTime} - {props.offer.endTime}</p>
    </div>
  )
}

export default OfferToday
