import Link from 'next/link';
import styles from './buttons.module.css'

const RegisterVenueButton = () => {
  return (
    <Link href={'/management/RegisterVenue'}>
    <button className={styles.registerVenueButton}>Register Venue</button>
    </Link>
  )
}


export default RegisterVenueButton;
