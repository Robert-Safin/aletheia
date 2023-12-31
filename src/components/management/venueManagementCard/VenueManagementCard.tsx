'use client'
import { FC } from 'react'
import styles from './VenueManagementCard.module.css'
import { Review, Venue, Event, Offer, Photo } from '@prisma/client'
import Image from 'next/image'
import { AiOutlineCalendar, AiOutlineTag } from 'react-icons/ai'
import Link from 'next/link'
import { getRating } from '@/components/home page/venue near user/ClosestVenueCard'
import ImageCarousel from '@/components/image carousel/Carousel'

interface EventProps {
  events: Event[]
}

interface OfferProps {
  offers: Offer[]
}
interface ReviewProps {
  reviews: Review[];
}
interface PhotoProps {
  photos: Photo[]
}
interface Props {
  venue: Venue & ReviewProps & EventProps & OfferProps & PhotoProps
}


const VenueManagementCard:FC<Props> = (props) => {
  const rating = getRating(props.venue.averageRating)


  return (
    <>
    <div className={styles.container}>
     <ImageCarousel photos={props.venue.photos}/>
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
      <Link href={`/management/${props.venue.id}`}>
      <button className={styles.viewButton}>VIEW VENUE INFORMATION</button>
      </Link>
    </div>
    </>
  )
}

export default VenueManagementCard
