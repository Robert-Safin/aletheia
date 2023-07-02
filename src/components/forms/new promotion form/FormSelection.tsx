'use client'
import MainHeader from '@/components/headers/MainHeader'
import styles from './FormSelection.module.css'
import { FC, useState } from 'react';
import OnetimeOffer, { OneTimeOfferForm } from './one time type/OneTimeOffer';

interface Props {
  submitRecurringOfferForm : (form:OneTimeOfferForm) => void
}

const FormSelection:FC<Props>= (props) => {

  const [form, setForm]= useState("")
  const [date, setDate] = useState(new Date());




  return (
    <>
      <div className={styles.formSelector}>
        <MainHeader title="Is this a reccuring event?"/>
        <button className={form === "one time" ? styles.formTypeButtonActive : styles.formTypeButtonInactive} onClick={() => setForm("one time")}>Yes</button>
        <button className={form === "recurring" ? styles.formTypeButtonActive : styles.formTypeButtonInactive} onClick={() => setForm("recurring")}>No</button>
      </div>
      {form === "one time" && <OnetimeOffer submitRecurringOfferForm={props.submitRecurringOfferForm}/>}
      {form === "recurring" && <h1>recur</h1> }
    </>
  )
}

export default FormSelection
