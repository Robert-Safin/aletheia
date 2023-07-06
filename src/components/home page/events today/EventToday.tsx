import { FC } from 'react'
import styles from './EventToday.module.css'
import { Event, Venue } from '@prisma/client'
import Image from 'next/image'

interface Props {
  event:Event & {
    venue: Venue
  }
}

const EventToday:FC<Props> = (props) => {



return (
  <div className={styles.container}>
  <Image className={styles.image} src={props.event.photo} alt={props.event.name} width={1000} height={1000}/>
  <h1 className={styles.eventName}>{props.event.name}</h1>
  <h1 className={styles.venueName}>{props.event.venue.name}</h1>

  <div className={styles.times}>
  <p>{props.event.startTime}</p>
  <p>-</p>
  <p>{props.event.endTime}</p>
  </div>

  </div>
)
}

export default EventToday
