"use client";
import { useState } from "react";
import FormInput from "../FormInput";
import FormLabel from "../FormLabel";
import styles from "./NewPromotionForm.module.css";
import MainHeader from "@/components/headers/MainHeader";

const NewPromotionForm = () => {
  const [form, setForm]= useState(0)
  return (
    <>
      <div className={styles.formSelector}>
        <MainHeader title="Event Type"/>
        <button className={styles.formSelectorButton} onClick={() => setForm(1)}>One time event</button>
        <button className={styles.formSelectorButton} onClick={() => setForm(2)}>Reocurring event</button>
      </div>



      {form === 1 && <div className={styles.form}>
      <h1>One time event</h1>

      </div>}

      {form === 2 && <div className={styles.form}>
      <h1>Reocurring event</h1>

      </div>}
    </>
  );
};

export default NewPromotionForm;
