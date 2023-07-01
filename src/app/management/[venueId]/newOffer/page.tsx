import { FC } from 'react'
import styles from './page.module.css'
import Container from '@/components/containers/Container'
import NewPromotionForm from '@/components/forms/new promotion form/NewPromotionForm'

interface Props {
params : {
  venueId: string
}
}

const NewPromotionPage:FC<Props> = async(props) => {
  return (
    <Container>
      <NewPromotionForm/>


    </Container>
  )
}

export default NewPromotionPage
