import { FC } from 'react'
import styles from './OfferToday.module.css'
import { Offer } from '@prisma/client'

interface Props {
  offer: Offer
}

const OfferToday:FC<Props> = () => {
  return (
    <p>hi mom</p>
  )
}

export default OfferToday
