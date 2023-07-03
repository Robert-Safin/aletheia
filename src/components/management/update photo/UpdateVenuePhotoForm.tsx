import { FC } from 'react'
import styles from './UpdateVenuePhoto.module.css'
import FormLabel from '@/components/forms/FormLabel'

interface Props {

}

const UpdateVenuePhotoForm:FC<Props> = (props) => {
  return (
    <form>
      <FormLabel title='Venue Images (.png, .jpeg, or .webp)' htmlFor='photo'/>

    </form>
  )
}

export default UpdateVenuePhotoForm
