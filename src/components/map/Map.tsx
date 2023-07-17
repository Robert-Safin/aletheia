"use client";
import { useEffect, useState } from "react";
import styles from "./Map.module.css";
import useCustomClientSession from "@/lib/useCustomClientSession";
import { Venue } from "@prisma/client";
import {
  GoogleMap,
  Marker,
  LoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import { PopulatedVenue, SearchQuery } from "@/app/home/page";
import ErrorPopup from "../popups/ErrorPopup";
import { getRating } from "../home page/venue near user/ClosestVenueCard";
import Image from "next/image";

const Map = () => {
  const session = useCustomClientSession();

  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState("");
  const [distance, setDistance] = useState(10000.0);
  const [popup, setPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [venuesNearUser, setVenuesNearUser] = useState([] as PopulatedVenue[]);

  const [selectedVenue, setSelectedVenue] = useState<PopulatedVenue | null>(
    null
  );

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
        if (data.failure > 0) {
          setVenuesNearUser([]);
          setPopupContent(data.message);
          setPopup(true);
          setTimeout(() => {
            setPopup(false);
          }, 5000);
        } else {
          setVenuesNearUser(data.data.venuesNearUser);
        }
      }
    };

    fetchData();
  }, [location, searchTerm, date, distance]);

  const containerStyle = {
    width: "100%",
    height: "770px",
  };

  const center = {
    lat: location.latitude,
    lng: location.longitude,
  };

  const zoom = 12;

  return (
    <>
      <LoadScript
        googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY!}
        libraries={["places"]} // Add additional libraries as needed
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
        >
          <Marker
            position={center}
            options={{
              icon: {
                url: "userMarker.svg",
              },
            }}
          />

          {venuesNearUser.map((venue) => (
            <Marker
              onClick={() => setSelectedVenue(venue)}
              key={venue.id}
              position={{ lat: venue.latitude, lng: venue.longitude }}
              options={{
                icon: {
                  url: "venueMarker.svg",
                },
              }}
            />
          ))}
          {selectedVenue && (
            <InfoWindow
              position={{
                lat: selectedVenue.latitude,
                lng: selectedVenue.longitude,
              }}
              onCloseClick={() => {
                setSelectedVenue(null);
              }}
            >
              <div className={styles.popUpContainer}>
                <h1 className={styles.venueName}>{selectedVenue.name}</h1>
                <div className={styles.starsAndRating}>
                  <div className={styles.stars}>
                    {getRating(selectedVenue.averageRating)}
                  </div>
                  <p>{selectedVenue.reviews?.length} reviews</p>
                </div>

                <div className={styles.imageAndCategories}>
                  <Image
                    className={styles.photo}
                    src={selectedVenue.mainPhoto}
                    alt={selectedVenue.name}
                    width={500}
                    height={500}
                  />

                  <div>
                    <h1>Categories:</h1>
                    <div className={styles.categories}>
                      {selectedVenue.category1 && (
                        <p className={styles.category}>{selectedVenue.category1}</p>
                      )}
                      {selectedVenue.category2 && (
                        <p className={styles.category}>{selectedVenue.category2}</p>
                      )}
                      {selectedVenue.category3 && (
                        <p className={styles.category}>{selectedVenue.category3}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
      {popup && <ErrorPopup message={popupContent} />}
    </>
  );
};

export default Map;
