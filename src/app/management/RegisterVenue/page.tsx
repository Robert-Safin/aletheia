import RegisterVenueForm from '@/components/forms/register venue form/RegisterVenueForm'
import styles from './page.module.css'
import Container from '@/components/containers/Container'

const RegisterVenuePage = async() => {
  return (

    <Container bgcolor='#262626'>
    <RegisterVenueForm />
    </Container>

  )

}


export default RegisterVenuePage
