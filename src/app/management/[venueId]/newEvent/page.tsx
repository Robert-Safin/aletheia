import { FC } from 'react'
import styles from './page.module.css'
import Container from '@/components/containers/Container'

interface Props {
  params: {
    venueId: string
  }
}


const NewEventPage: FC<Props> = async() => {
  return (
    <Container>
      <h1>New event form</h1>
    </Container>
  )
}

export default NewEventPage
