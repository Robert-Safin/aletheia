'use client'
import MainHeader from '@/components/headers/MainHeader'
import styles from './formSelection.module.css'
import { FC, useState } from 'react';
import { ReccuringOfferForm } from './one time type/ReccuringForm';

import ReccuringForm from './one time type/ReccuringForm';
import OnceForm, { OnceOfferForm } from './recurring type/OnceForm';

interface Props {
  submitRecurringOfferForm : (form:ReccuringOfferForm) => void
  submitOnceOfferForm: (form:OnceOfferForm) => void
}

const FormSelection:FC<Props>= (props) => {

  const [form, setForm]= useState("")




  return (
    <>
      <div className={styles.formSelector}>
        <MainHeader title="Is this a reccuring event?"/>
        <button className={form === "one time" ? styles.formTypeButtonActive : styles.formTypeButtonInactive} onClick={() => setForm("one time")}>Yes</button>
        <button className={form === "recurring" ? styles.formTypeButtonActive : styles.formTypeButtonInactive} onClick={() => setForm("recurring")}>No</button>
      </div>
      {form === "one time" && <ReccuringForm submitRecurringOfferForm={props.submitRecurringOfferForm}/>}
      {form === "recurring" && <OnceForm submitOnceOfferForm={props.submitOnceOfferForm} /> }
    </>
  )
}

export default FormSelection
