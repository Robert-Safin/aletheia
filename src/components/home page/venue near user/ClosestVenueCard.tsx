"use client";
import { FC } from "react";
import styles from "./ClosestVenueCard.module.css";
import Image from "next/image";
import { AiFillCalendar, AiFillStar, AiOutlineStar, AiTwotoneTag } from "react-icons/ai";
import Link from "next/link";
import { BiSolidStarHalf } from "react-icons/bi";
import { PopulatedVenue } from "@/app/home/page";
import { Photo } from "@prisma/client";

interface Props {
  venue: PopulatedVenue & { photos: Photo[]}
  userLatitude: number;
  userLongitude: number;
}

export const getRating = (averageRating: number) => {
  let stars: any = [];
  const roundedRating = Math.round(averageRating * 2) / 2;
  const fullStars = Math.floor(roundedRating);
  const halfStars = roundedRating % 1 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<AiFillStar className={styles.starIcon} key={"a" + i} />);
  }

  for (let i = 0; i < halfStars; i++) {
    stars.push(<BiSolidStarHalf className={styles.starIcon} key={"b" + i} />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<AiOutlineStar className={styles.starIcon} key={"c" + i} />);
  }

  if (stars.length === 0) {
    stars = "No reviews yet";
  }

  return stars;
};

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

const ClosestVenueCard: FC<Props> = (props) => {


  const stars = getRating(props.venue.averageRating);

  const unformattedDistanceFromUser = calculateDistance(
    props.userLatitude,
    props.userLongitude,
    props.venue.latitude,
    props.venue.longitude
  );
  const metresDistanceFromUser = Math.round(unformattedDistanceFromUser);
  let distance;
  if (metresDistanceFromUser > 1000) {
    const kmDistanceFromUser = Math.round(unformattedDistanceFromUser / 1000);
    distance = `${kmDistanceFromUser}km`;
  } else {
    distance = `${metresDistanceFromUser}m`;
  }

  return (
    <div className={styles.container}>
      <Link href={`/${props.venue.id}`}>
        <Image
          className={styles.photo}
          src={props.venue.photos[0].url}
          alt={`photo of ${props.venue.name}`}
          width={1000}
          height={1000}
        />

      </Link>
      <h1 className={styles.name}>{props.venue.name}</h1>
      <div className={styles.distanceAndStars}>
        <div className={styles.rating}>{stars}</div>
        <p className={styles.distance}>{distance}</p>
      </div>

      <div className={styles.activities}>

       {props.venue.events!.length > 0 &&  <div className={styles.activityItem}>
          <AiFillCalendar className={styles.icon}/>
          <p className={styles.activityLength}>{props.venue.events!.length} Upcoming events</p>
        </div>}

       {props.venue.offers!.length > 0 && <div className={styles.activityItem}>
        <AiTwotoneTag className={styles.icon}/>
        <p className={styles.activityLength}>{props.venue.offers!.length} Offers available</p>
        </div>}

      </div>

    </div>
  );
};

export default ClosestVenueCard;
