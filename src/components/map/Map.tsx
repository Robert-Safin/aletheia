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

const Map = () => {
  const session = useCustomClientSession();

  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState("");
  const [distance, setDistance] = useState(10000.00);
  const [popup, setPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [venuesNearUser, setVenuesNearUser] = useState([] as PopulatedVenue[]);

  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

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
    height: "750px",
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
              <div>
                <h2 className={styles.venueName}>{selectedVenue.name}</h2>
                <p className={styles.venueAbout}>{selectedVenue.about}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
      {popup &&<ErrorPopup message={popupContent}/>}
    </>
  );
};

export default Map;
