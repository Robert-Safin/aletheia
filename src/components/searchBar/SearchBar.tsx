"use client";
import { BsSearch } from "react-icons/bs";
import styles from "./SearchBar.module.css";
import { FormEvent, useState } from "react";
import FormLabel from "../forms/FormLabel";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import DatePicker from "react-datepicker";
import { CiCalendar } from "react-icons/ci";
import "react-datepicker/dist/react-datepicker.css";

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [activity, setActivity] = useState("");
  const [date, setDate] = useState(new Date());
  const [distance, setDistance] = useState(5);

  const [todayIsClick, setTodayIsClick] = useState(true);
  const [tomorrowIsClick, setTomorrowIsClick] = useState(false);
  const [dateIsClick, setDateIsClick] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(activity);
    console.log(date);
    console.log(distance);

  };

  const handleTodayClick = () => {
    setTodayIsClick(true);
    setTomorrowIsClick(false);
    setDateIsClick(false);
    const today = new Date();
    setDate(today);
  };

  const handleTomorrowClick = () => {
    setTomorrowIsClick(true);
    setTodayIsClick(false);
    setDateIsClick(false);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow);
  };

  const handleCalendarclick = () => {
    setDateIsClick(true);
    setTodayIsClick(false);
    setTomorrowIsClick(false);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.container} onClick={() => setIsExpanded(true)}>
        <BsSearch className={styles.icon} />
        <input
          className={styles.input}
          type="text"
          placeholder="Search Activity"
          onChange={(event) => setActivity(event.target.value)}
        />
      </div>
      {isExpanded && (
        <>
          <FormLabel title="When" htmlFor="when" />
          <div className={styles.whenOption}>
            <p className={ todayIsClick ?  styles.whenButtonActive : styles.whenButton} onClick={handleTodayClick}>Today</p>
            <p className={tomorrowIsClick ? styles.whenButtonActive : styles.whenButton} onClick={handleTomorrowClick}>Tomorrow</p>
            <DatePicker
              onInputClick={handleCalendarclick}
              selected={date}
              onChange={() => setDate(date)}
              customInput={<CiCalendar className={dateIsClick ? styles.dateIconActive: styles.dateIcon} />}
            />
          </div>

          <FormLabel title="Max distance" htmlFor="max distance" />
          <Slider
            min={1}
            max={10}
            step={0.5}
            value={distance}
            onChange={(event) => setDistance(Number(event.valueOf()))}
            handleStyle={{
              backgroundColor: "#F87171", zIndex: 0,
              borderColor: "#F87171",
              opacity: 1,
            }}
            trackStyle={{ backgroundColor: "#F87171", zIndex: 0 }}
          />

          <p className={styles.distance}>{distance}km</p>
          <button className={styles.submitButton} type="submit">SEARCH</button>
        </>
      )}
    </form>
  );
};

export default SearchBar;
