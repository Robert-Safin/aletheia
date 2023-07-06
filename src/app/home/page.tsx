"use client";
import Container from "../../components/containers/Container";
import MainHeader from "../../components/headers/MainHeader";
import SubHeader from "../../components/headers/SubHeader";
import SearchBar from "../../components/searchBar/SearchBar";
import styles from "./page.module.css";
import { BiWalk } from "react-icons/bi";
import { MdOutlineLocalOffer, MdLocalOffer } from "react-icons/md";
import { FC, useEffect, useState } from "react";
import { AiFillCalendar, AiOutlineCalendar } from "react-icons/ai";
import XScrollContainer from "@/components/home page/x-scroll card container/XScrollContainer";
import { Event, Offer, Review, Venue } from "@prisma/client";
import ClosestVenueCard from "@/components/home page/venue near user/ClosestVenueCard";
import UpcomingEvent from "@/components/home page/upcoming events/UpcomingEvent";
import EventToday from "@/components/home page/events today/EventToday";
import LoadingSkeleton from "@/components/home page/loading skeleton/LoadingSkeleton";
import OfferToday from "@/components/home page/offer today/OfferToday";
import UpcomingOffer from "@/components/home page/upcoming offer/UpcomingOffer";
import { getTodaysEvents, getUpcomingEvents } from "@/lib/filter functions/filterEventFunctions";
import { getTodaysOffers, getUpcomingOffers } from "@/lib/filter functions/filterOfferFunctions";

export interface SearchQuery {
  latitude: number;
  longitude: number;
  searchTerm: string;
  date: string;
  distance: number;
}

export interface PopulatedEvent extends Event {
  venue: Venue;
}

export interface PopulatedOffer extends Offer {
  venue: Venue;
}

export interface PopulatedVenue extends Venue {
  events?: PopulatedEvent[];
  offers?: PopulatedOffer[];
  reviews?: Review[];

}

const HomePage: FC = (props) => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState("");
  const [distance, setDistance] = useState(0.05);

  const [venuesNearUser, setVenuesNearUser] = useState([] as PopulatedVenue[]);

  function calculateDistance(
    userLatitude: number,
    userLongitude: number,
    venueLatitude: number,
    venueLongitude: number
  ) {
    const earthRadius = 6371e3;
    const userLatRadians = toRadians(userLatitude);
    const venueLatRadians = toRadians(venueLatitude);
    const latDiffRadians = toRadians(venueLatitude - userLatitude);
    const lonDiffRadians = toRadians(venueLongitude - userLongitude);

    const a =
      Math.sin(latDiffRadians / 2) * Math.sin(latDiffRadians / 2) +
      Math.cos(userLatRadians) *
        Math.cos(venueLatRadians) *
        Math.sin(lonDiffRadians / 2) *
        Math.sin(lonDiffRadians / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance;
  }

  function toRadians(degrees: number) {
    return degrees * (Math.PI / 180);
  }

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
        const searchQuery: SearchQuery = {
          latitude: location.latitude,
          longitude: location.longitude,
          searchTerm: searchTerm,
          date: date,
          distance: distance,
        };
        const response = await fetch("/api/home-page", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(searchQuery),
        });

        const data = await response.json();
        setVenuesNearUser(data.data.venuesNearUser);
      }
    };

    fetchData();
  }, [location, searchTerm, date, distance]);

  // closest venues
  const venuesWithDistance = venuesNearUser.map((venue) => ({
    ...venue,
    distance: calculateDistance(
      location.latitude,
      location.longitude,
      venue.latitude,
      venue.longitude
    ),
  }));

  const sortedVenues = venuesWithDistance.sort(
    (a, b) => a.distance - b.distance
  );







  // Upcoming events (valid)
  const upcomingEvents = getUpcomingEvents(venuesNearUser)

  // Events today (valid)
  const todaysEvents = getTodaysEvents(venuesNearUser)


  //upcoming offers
  const upcomingOffers = getUpcomingOffers(venuesNearUser)

  //offer today
  const todaysOffers = getTodaysOffers(venuesNearUser)

  return (
    <Container>
      <MainHeader title="Welcome Home" />
      <SearchBar />









      <div className={styles.group}>
        <div className={styles.categoryHeader}>
          <MdOutlineLocalOffer className={styles.categoryIcon} />
          <MainHeader title="Offers Today" />
        </div>
        {venuesNearUser.length > 0 ? (
          <XScrollContainer>
            {todaysOffers.map((offer) => (
              <OfferToday key={offer.id} offer={offer} />
            ))}
          </XScrollContainer>
        ) : (
          <XScrollContainer>
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </XScrollContainer>
        )}

      </div>








      <div className={styles.group}>
        <div className={styles.categoryHeader}>
          <MdLocalOffer className={styles.categoryIcon} />
          <MainHeader title="Upcoming Offers" />
        </div>
        {venuesNearUser.length > 0 ? (
          <XScrollContainer>
            {upcomingOffers.map((offer) => (
              <UpcomingOffer key={offer.id} offer={offer} />

            ))}
          </XScrollContainer>
        ) : (
          <XScrollContainer>
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </XScrollContainer>
        )}

      </div>








      <div className={styles.group}>
        <div className={styles.categoryHeader}>
          <AiOutlineCalendar className={styles.categoryIcon} />
          <MainHeader title="Events Today" />
        </div>
        {venuesNearUser.length > 0 ? (
          <XScrollContainer>
            {todaysEvents.map((event) => (
              <EventToday key={event.id} event={event} />
            ))}
          </XScrollContainer>
        ) : (
          <XScrollContainer>
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </XScrollContainer>
        )}
      </div>




      <div className={styles.group}>
        <div className={styles.categoryHeader}>
          <AiFillCalendar className={styles.categoryIcon} />
          <MainHeader title="Upcoming Event" />
        </div>
        {venuesNearUser.length > 0 ? (
          <XScrollContainer>
            {upcomingEvents.map((event) => (
              <UpcomingEvent key={event.id} event={event} />
            ))}
          </XScrollContainer>
        ) : (
          <XScrollContainer>
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </XScrollContainer>
        )}
      </div>









      <div className={styles.group}>
        <div className={styles.categoryHeader}>
          <BiWalk className={styles.categoryIcon} />
          <MainHeader title="Places Near You" />
        </div>
        {venuesNearUser.length > 0 ? (
          <XScrollContainer>
            {sortedVenues.map((venue) => (
              <ClosestVenueCard
                key={venue.id}
                venue={venue}
                userLatitude={location.latitude}
                userLongitude={location.longitude}
              />
            ))}
          </XScrollContainer>
        ) : (
          <XScrollContainer>
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </XScrollContainer>
        )}
      </div>






    </Container>
  );
};

export default HomePage;
