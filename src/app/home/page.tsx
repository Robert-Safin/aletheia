'use client'
import Container from "../components/containers/Container";
import MainHeader from "../components/headers/MainHeader";
import SubHeader from "../components/headers/SubHeader";
import SearchBar from "../components/searchBar/SearchBar";
import styles from "./page.module.css";
import {LuVerified} from "react-icons/lu"
import {MdOutlineLocalOffer, MdLocalOffer} from "react-icons/md"
import {BsCalendarEvent, BsCalendar2EventFill} from 'react-icons/bs'
import { useState } from "react";
import useCustomClientSession from "../lib/useCustomClientSession";
import MissingClientSession from "../components/missingClientSession/MissingClientSession";


const HomePage = () => {
  const session = useCustomClientSession()

  if (session.status === 'loading') {
    return (
      <></>
    )
  }

  if (session.status === 'unauthenticated') {
    return (
      <Container>
        <MainHeader title="Please authenticate"/>
        <MissingClientSession/>
      </Container>
    )
  }


  return (
    <Container>
      <MainHeader title="Welcome Home"/>
      <SearchBar/>


      <div className={styles.categoryHeader}>
      <MdLocalOffer className={styles.categoryIcon}/>
      <SubHeader title="Offers happening now"/>
      </div>

      <div className={styles.categoryHeader}>
      <MdOutlineLocalOffer className={styles.categoryIcon}/>
      <SubHeader title="Upcoming Offers"/>
      </div>

      <div className={styles.categoryHeader}>
      <BsCalendar2EventFill className={styles.categoryIcon}/>
      <SubHeader title="Events happening now"/>
      </div>

      <div className={styles.categoryHeader}>
      <BsCalendarEvent className={styles.categoryIcon}/>
      <SubHeader title="Upcoming Event"/>
      </div>



      <div className={styles.categoryHeader}>
      <LuVerified className={styles.categoryIcon}/>
      <SubHeader title="Top Places Near You"/>
      </div>

    </Container>
  );
};

export default HomePage;
