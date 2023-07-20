import { FC } from "react";
import styles from "./EventToday.module.css";
import { Event, Photo, Venue } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface Props {
  event: Event & {
    venue: Venue;
  } & {
    photos: Photo[]
  }
}

const EventToday: FC<Props> = (props) => {
  return (
    <div className={styles.container}>
      <Link href={`/${props.event.venue.id}/event/${props.event.id}`}>
        <Image
          className={styles.image}
          src={props.event.photos[0].url}
          alt={props.event.name}
          width={1000}
          height={1000}
        />
      </Link>
      <h1 className={styles.eventName}>{props.event.name}</h1>
      <h1 className={styles.venueName}>{props.event.venue.name}</h1>

      <div className={styles.times}>
        <p>{props.event.startTime}</p>
        <p>-</p>
        <p>{props.event.endTime}</p>
      </div>
    </div>
  );
};

export default EventToday;
