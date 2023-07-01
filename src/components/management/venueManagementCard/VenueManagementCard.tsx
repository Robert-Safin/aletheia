'use client'
import { FC } from 'react'
import styles from './VenueManagementCard.module.css'
import { Review, Venue, Event, Offer } from '@prisma/client'
import Image from 'next/image'
import { getRating } from '@/components/homePage/VenueCard'
import { AiOutlineCalendar, AiOutlineTag } from 'react-icons/ai'
import { MdOutlineDiscount } from 'react-icons/md'

interface EventProps {
  events: Event[]
}

interface OfferProps {
  offers: Offer[]
}
interface ReviewProps {
  reviews: Review[];
}
interface Props {
  venue: Venue & ReviewProps & EventProps & OfferProps;
}


const VenueManagementCard:FC<Props> = (props) => {
  const rating = getRating(props.venue.averageRating)


  return (
    <>
    <div className={styles.container}>
      <Image className={styles.photo} src={props.venue.mainPhoto} alt={props.venue.name} width={1000} height={1000}/>
      <h1 className={styles.name}>{props.venue.name}</h1>

      <div className={styles.ratingAndReviews}>
        <div className={styles.rating}>{rating}</div>
        <p className={styles.reviews}>{props.venue.reviews.length} Reviews</p>
      </div>
      <div className={styles.eventsAndPromotions}>
        <div className={styles.iconAndCount}>
          <AiOutlineCalendar className={styles.icon}/>
          <p className={styles.length}>{props.venue.events.length} Events</p>
        </div>
        <div className={styles.iconAndCount}>
          <AiOutlineTag className={styles.icon}/>
          <p className={styles.length}>{props.venue.offers.length} Offers</p>
        </div>
      </div>
      <button className={styles.viewButton}>VIEW VENUE INFORMATION</button>
    </div>
    </>
  )
}

export default VenueManagementCard
