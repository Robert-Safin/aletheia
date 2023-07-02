'use client'

import { FC, ReactEventHandler, useState } from 'react';
import styles from './DateInput.module.css'
import DatePicker from "react-datepicker";
import { CiCalendar } from "react-icons/ci";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  getDate: (date:Date) => void
}

const DateInput:FC<Props> = (props) => {
  const [date, setDate] = useState(new Date());
  const [isClicked, setIsClicked] = useState(false);


  const handleChange = (e:Date) => {
  setDate(e)
  props.getDate(e)
  }

  return (
    <>
    <DatePicker
    className={styles.datePicker}
    onInputClick={() => setIsClicked(true)}
    selected={date}
    onChange={handleChange}
    customInput={<CiCalendar className={isClicked ? styles.dateIconActive : styles.dateIconInactive} />}
    />
    <p>{date.toLocaleDateString()}</p>

    </>
  );
}

export default DateInput
