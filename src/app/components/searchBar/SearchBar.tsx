
import {BsSearch} from 'react-icons/bs'
import styles from './SearchBar.module.css'
const SearchBar = () => {
    return (
        <div className={styles.container}>
          <BsSearch className={styles.icon}/>
            <input className={styles.input} type="text" placeholder='Search'></input>
        </div>
    )
}

export default SearchBar
