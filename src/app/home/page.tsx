"use client";
import Container from "../components/containers/Container";
import MainHeader from "../components/headers/MainHeader";
import SubHeader from "../components/headers/SubHeader";
import SearchBar from "../components/searchBar/SearchBar";
import styles from "./page.module.css";
import { LuVerified } from "react-icons/lu";
import { MdOutlineLocalOffer, MdLocalOffer } from "react-icons/md";
import { BsCalendarEvent, BsCalendar2EventFill } from "react-icons/bs";
import CardContainer from "../components/homePage/CardContainer";
import { FC, useEffect, useState } from "react";
import VenueCard from "../components/homePage/VenueCard";
import useCustomClientSession from "../lib/useCustomClientSession";
import LoadingSession from "../components/loading/LoadingSession";
import { Venue } from "@prisma/client";

const HomePage: FC = (props) => {
  const session = useCustomClientSession();

  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  const [venuesNearUser, setVenuesNearUser] = useState([] as Venue[]);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        });
      }
    };
    getLocation();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (location.latitude !== 0 && location.longitude !== 0) {
        const response = await fetch("/api/populate-home-page", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            latitude: location.latitude,
            longitude: location.longitude,
          }),
        });
        const data = await response.json();
        setVenuesNearUser(data.venuesNearUser);
      }
    };

    fetchData();
  }, [location]);

  if (session.status === "loading") {
    return <LoadingSession />;
  }

  return (
    <Container>
      <MainHeader title="Welcome Home" />
      <SearchBar />

      <div className={styles.categoryHeader}>
        <MdLocalOffer className={styles.categoryIcon} />
        <SubHeader title="Offers happening now" />
      </div>

      <div className={styles.categoryHeader}>
        <MdOutlineLocalOffer className={styles.categoryIcon} />
        <SubHeader title="Upcoming Offers" />
      </div>

      <div className={styles.categoryHeader}>
        <BsCalendar2EventFill className={styles.categoryIcon} />
        <SubHeader title="Events happening now" />
      </div>

      <div className={styles.categoryHeader}>
        <BsCalendarEvent className={styles.categoryIcon} />
        <SubHeader title="Upcoming Event" />
      </div>

      <div className={styles.categoryHeader}>
        <LuVerified className={styles.categoryIcon} />
        <SubHeader title="Top Places Near You" />
      </div>

      <CardContainer>
        {venuesNearUser.map((venue) => (
          <VenueCard key={venue.id} venue={venue} userLatitude={location.latitude} userLongitude={location.longitude}/>
        ))}
      </CardContainer>
    </Container>
  );
};

export default HomePage;
