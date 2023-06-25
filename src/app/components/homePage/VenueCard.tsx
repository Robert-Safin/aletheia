import { FC } from "react";
import styles from "./VenueCard.module.css";
import { Venue } from "@prisma/client";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";

interface Props {
  venue: Venue;
}

const getRating = (averageRating: number) => {
  let stars: any = [];
  for (let i = 0; i < averageRating; i++) {
    stars.push(<AiFillStar className={styles.starIcon}/>);
  }
  if (stars.length === 0) {
    stars = "No reviews yet";
  }
  return stars;
};

const VenueCard: FC<Props> = (props) => {
  const starts = getRating(props.venue.averageRating);
  return (
    <div className={styles.container}>
      <Image
        className={styles.photo}
        src={props.venue.photo}
        alt={`photo of ${props.venue.name}`}
        width={1000}
        height={1000}
      />
      <h1 className={styles.name}>{props.venue.name}</h1>

      <div className={styles.rating}>{starts}</div>
    </div>
  );
};

export default VenueCard;
