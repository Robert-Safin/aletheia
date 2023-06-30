"use client";
import { FC } from "react";
import styles from "./UnverifiedVenueCard.module.css";
import { Venue } from "@prisma/client";

interface Props {
  venue: Venue;
  handleVerify: (id: number) => void;
  handleDecline: (id: number) => void;
}

const UnverifiedVenueCard: FC<Props> = (props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.cell}>{props.venue.name}</h1>
      <h1 className={styles.cell}>{props.venue.about}</h1>
      <h1 className={styles.cell}>{props.venue.formattedAddress}</h1>
      <h1 className={styles.cell}>{props.venue.city}</h1>
      <h1 className={styles.cell}>{props.venue.mainPhoto}</h1>
      <button
        className={styles.button}
        onClick={() => props.handleVerify(props.venue.id)}
      >
        Approve
      </button>
      <button
        className={styles.button}
        onClick={() => props.handleDecline(props.venue.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default UnverifiedVenueCard;
