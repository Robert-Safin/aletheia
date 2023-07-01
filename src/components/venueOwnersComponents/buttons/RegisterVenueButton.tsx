import Link from 'next/link';
import styles from './RegisterVenueButton.module.css'

const RegisterVenueButton = () => {
  return (
    <Link href={'/management/RegisterVenue'}>
    <button className={styles.registerVenueButton}>REGISTER NEW VENUE</button>
    </Link>
  )
}


export default RegisterVenueButton;
