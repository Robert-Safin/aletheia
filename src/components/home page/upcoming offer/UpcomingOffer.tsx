import { FC } from "react";
import styles from "./UpcomingOffer.module.css";
import { Offer, Photo, Venue } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface Props {
  offer: Offer & {
    venue: Venue;
  } &{
    photos: Photo[]
  }
}

const UpcomingOffer: FC<Props> = (props) => {
  let formatDate;

  if (props.offer.isRecurring === false) {
    const oneTimeDate = new Date(props.offer.startDate);
    formatDate = oneTimeDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
  }

  if (props.offer.isRecurring === true) {
    const weekdays = [
      "onSunday",
      "onMonday",
      "onTuesday",
      "onWednesday",
      "onThursday",
      "onFriday",
      "onSaturday",
    ];
    const startDate = new Date(props.offer.startDate);
    const endDate = new Date(String(props.offer.endDate));
    const currentDate = new Date();

    for (let d = currentDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      //@ts-ignore
      if (props.offer[weekdays[d.getDay()]]) {
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
      <Link href={`/${props.offer.venue.id}/offer/${props.offer.id}`}>
        <Image
          className={styles.photo}
          src={props.offer.photos[0].url}
          alt={props.offer.name}
          width={1000}
          height={1000}
        />
      </Link>

      <h1 className={styles.offerName}>{props.offer.name}</h1>
      <p className={styles.venueName}>{props.offer.venue.name}</p>

      <div className={styles.dateAndTimes}>
        <p>{formatDate},</p>
        <p>
          {props.offer.startTime}-{props.offer.endTime}
        </p>
      </div>
    </div>
  );
};

export default UpcomingOffer;
