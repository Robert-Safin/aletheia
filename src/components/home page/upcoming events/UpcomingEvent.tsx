"use client";
import { FC } from "react";
import styles from "./UpcomingEvent.module.css";
import { Event, PrismaClient, Venue } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface Props {
  event: Event & {
    venue: Venue;
  };
}

const UpcomingEvent: FC<Props> = (props) => {
  const date = new Date(props.event.startDate);
  const formatDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

  const time = new Date(props.event.startDate);
  const formatTime = time.toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className={styles.container}>
      <Link href={`/${props.event.venue.id}/event/${props.event.id}`}>
      <Image
        className={styles.photo}
        src={props.event.photo}
        alt={props.event.name}
        width={1000}
        height={1000}
      />
      </Link>
      <h1 className={styles.eventName}>{props.event.name}</h1>
      <h1 className={styles.venueName}>{props.event.venue.name}</h1>

      <div className={styles.dateAndTime}>
        <p>{formatDate},</p>
        <p>{formatTime}</p>
      </div>
    </div>
  );
};

export default UpcomingEvent;
