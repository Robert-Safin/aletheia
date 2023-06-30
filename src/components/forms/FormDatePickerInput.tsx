import styles from "./FormDatePickerInput.module.css";

import { FC } from "react";

import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { CiCalendar } from "react-icons/ci";

const FormDatePickerInput: FC = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className={styles.container}>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date!)}
        customInput={<CiCalendar className={styles.icon}/>}
      />
    </div>
  );
};

export default FormDatePickerInput;
