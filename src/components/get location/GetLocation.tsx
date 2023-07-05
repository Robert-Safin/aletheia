'use client'

import { FC, useEffect, useState } from "react"

interface Props {
  obtainUserLocation: (userLatitude:number, userLongitude:number) => void
}

const GetLocation:FC<Props> = (props) => {
  // const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          // setLocation(newLocation);
          props.obtainUserLocation(newLocation.latitude, newLocation.longitude);
        });
      }
    };
    getLocation();
  }, [props]);  // remove location.latitude and location.longitude from the dependencies

  return (
    <>
    </>
  )
}


export default GetLocation
