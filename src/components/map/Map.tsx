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

const Map = () => {
  const session = useCustomClientSession();

  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  const [venuesNearUser, setVenuesNearUser] = useState([] as Venue[]);
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
        setVenuesNearUser(data.venuesNearUser);
      }
    };

    fetchData();
  }, [location]);

  // if (session.status === "loading") {
  //   return <LoadingSession />;
  // }

  const containerStyle = {
    width: "100%",
    height: "750px",
  };

  const center = {
    lat: location.latitude,
    lng: location.longitude,
  };

  const zoom = 12;

  const mapStyle = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#212121",
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#212121",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "administrative.country",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#bdbdbd",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#181818",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1b1b1b",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#2c2c2c",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#8a8a8a",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          color: "#373737",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#3c3c3c",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [
        {
          color: "#4e4e4e",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#000000",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#3d3d3d",
        },
      ],
    },
  ];

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
          options={{ styles: mapStyle }}
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
    </>
  );
};

export default Map;
