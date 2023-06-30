'use client'
import {BsSearch} from 'react-icons/bs'
import styles from './SearchBar.module.css'
import { useState } from 'react'
import FormLabel from '../forms/FormLabel'
import FormInput from '../forms/FormInput'
import FormDatePickerInput from '../forms/FormDatePickerInput'




const SearchBar = () => {

  const [isExpanded, setIsExpanded] = useState(false)




    return (
      <form className={styles.form}>
        <div className={styles.container} onClick={() => setIsExpanded(true)}>
          <BsSearch className={styles.icon}/>
            <input className={styles.input} type="text" placeholder='Search Activity'/>
        </div>
        {isExpanded &&
        <>
        <FormLabel title='Where' htmlFor='where'/>
        <FormInput type='text' name='when' placeholder='Kuta' value={undefined}/>


        <FormLabel title='When' htmlFor='when'/>
        <div className={styles.whenOption}>


          <button className={styles.whenButton}>Today</button>
          <button className={styles.whenButton}>Tomorrow</button>
        <FormDatePickerInput/>
        </div>
        </>
        }
      </form>
    )
}

export default SearchBar
