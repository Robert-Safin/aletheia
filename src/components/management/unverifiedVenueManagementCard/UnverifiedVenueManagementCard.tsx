'use client'
import styles from './UnverifiedVenueManagementCard.module.css'

import { FC, useTransition } from 'react'
import { Photo, Venue } from '@prisma/client'
import Image from 'next/image'
import { AiOutlineClockCircle } from 'react-icons/ai'

interface Props {
venue : Venue & {
  photos: Photo[]
}
handleDelete : (id:number) => void
}



const UnverifiedVenueManagementCard:FC<Props> = (props) => {
  const [transition, startTransition] = useTransition()


  return (
    <>
    <div className={styles.container}>
      <Image className={styles.photo} src={props.venue.photos[0].url} alt={props.venue.name} width={1000} height={1000}/>
      <h1 className={styles.name}>{props.venue.name}</h1>

      <div className={styles.iconAndStatus}>
        <AiOutlineClockCircle/>
        <p>Status: Awaiting Review</p>
      </div>
      <button className={styles.cancel} onClick={() => startTransition(()=> props.handleDelete(props.venue.id))}>CANCEL REQUEST</button>
    </div>
    </>
  )
}

export default UnverifiedVenueManagementCard
