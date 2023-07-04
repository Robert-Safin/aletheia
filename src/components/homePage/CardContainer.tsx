'use client'
import { FC, useEffect, useState } from 'react'
import styles from './CardContainer.module.css'
import { Venue } from '@prisma/client';
import VenueCard from './VenueCard';
interface Props {

}
const VenueCardContainer:FC<Props> = (props) => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  const [venuesNearUser, setVenuesNearUser] = useState([] as Venue[]);

  function calculateDistance(userLatitude:number, userLongitude:number, venueLatitude:number, venueLongitude:number) {
    const earthRadius = 6371e3;
    const userLatRadians = toRadians(userLatitude);
    const venueLatRadians = toRadians(venueLatitude);
    const latDiffRadians = toRadians(venueLatitude - userLatitude);
    const lonDiffRadians = toRadians(venueLongitude - userLongitude);

    const a = Math.sin(latDiffRadians / 2) * Math.sin(latDiffRadians / 2) +
      Math.cos(userLatRadians) * Math.cos(venueLatRadians) *
      Math.sin(lonDiffRadians / 2) * Math.sin(lonDiffRadians / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance;
  }

  function toRadians(degrees:number) {
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
        const response = await fetch("/api/get-venues", {
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
        setVenuesNearUser(data.data.venuesNearUser);
      }
    };

    fetchData();
  }, [location]);

  const venuesOrderedByDistance = venuesNearUser.map((venue) => {
    const distance = calculateDistance(location.latitude, location.longitude, venue.latitude, venue.longitude);
    return { ...venue, distance };
  }
  ).sort((a, b) => a.distance - b.distance);


  return (
    <div className={styles.container}>
        { venuesOrderedByDistance.map((venue) => (
          <VenueCard key={venue.id} venue={venue} userLatitude={location.latitude} userLongitude={location.longitude}/>
        ))
        }
    </div>
  )
}

export default VenueCardContainer
