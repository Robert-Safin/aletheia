"use client";
import { FC } from "react";
import styles from "./UpcomingEvent.module.css";
import { Event, Photo, PrismaClient, Venue } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface Props {
  event: Event & {
    venue: Venue;
  } & {
    photos: Photo[];
  }
}

const UpcomingEvent: FC<Props> = (props) => {
  let formatDate

  if (props.event.isRecurring === false) {
    const oneTimeDate = new Date(props.event.startDate);
      formatDate = oneTimeDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
  }


  if (props.event.isRecurring === true) {
    const weekdays = ["onSunday", "onMonday", "onTuesday", "onWednesday", "onThursday", "onFriday", "onSaturday"];
    const startDate = new Date(props.event.startDate);
    const endDate = new Date(String(props.event.endDate));
    const currentDate = new Date();

    for (let d = currentDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      //@ts-ignore
      if (props.event[weekdays[d.getDay()]]) {
        formatDate = d.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
        });
        break;
      }
    }
  }


  return (
    <div className={styles.container}>
      <Link href={`/${props.event.venue.id}/event/${props.event.id}`}>
      <Image
        className={styles.photo}
        src={props.event.photos[0].url}
        alt={props.event.name}
        width={1000}
        height={1000}
      />
      </Link>
      <h1 className={styles.eventName}>{props.event.name}</h1>
      <h1 className={styles.venueName}>{props.event.venue.name}</h1>

      <div className={styles.dateAndTime}>
        <p>{formatDate},</p>
        <p>{props.event.startTime}-{props.event.endTime} </p>
      </div>
    </div>
  );
};

export default UpcomingEvent;
