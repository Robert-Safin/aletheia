import { FC } from 'react'
import styles from './UpcomingOffer.module.css'
import { Offer } from '@prisma/client'

interface Props {
  offer: Offer
}

const UpcomingOffer:FC<Props> = () => {
  return (
    <p>hi mom</p>
  )
}

export default UpcomingOffer
