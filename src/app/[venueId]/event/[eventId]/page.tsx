import Container from "@/components/containers/Container";
import MainHeader from "@/components/headers/MainHeader";
import { PrismaClient } from "@prisma/client";
import { FC } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { getRating } from "@/components/home page/venue near user/ClosestVenueCard";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BiSolidStarHalf } from "react-icons/bi";
import SubHeader from "@/components/headers/SubHeader";
import Link from "next/link";
interface Props {
  params: {
    venueId: string;
    eventId: string;
  };
}

const getEvent = async (id: number) => {
  const prisma = new PrismaClient();
  const event = await prisma.event.findUnique({
    where: {
      id: id,
    },
    include: {
      QREvents: true,
      venue: {
        include: {
          reviews: true,
        },
      },
    },
  });
  prisma.$disconnect();
  return event;
};

const EventShowPage: FC<Props> = async (props) => {
  const { venueId, eventId } = props.params;
  const event = await getEvent(Number(eventId));


  const formatDate = event?.startDate?.toString().slice(0, 10);

  const getRating = (averageRating: number) => {
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

  const stars = getRating(event!.venue.averageRating);
  return (
    <Container>

      <div className={styles.card}>
      <MainHeader title={"Event"} />
        <Image
          className={styles.photo}
          src={event!.photo}
          alt={event!.name}
          width={1000}
          height={1000}
        />

        <div className={styles.infoContainer}>
          <div className={styles.locationAndClaim}>
            <div className={styles.grouping}>
              <h1 className={styles.groupHeader}>Location:</h1>
              <Link href={`/${event?.venue.id}`}>
              <p className={styles.infoItem}>{event?.venue.name}</p>
              </Link>
            </div>
            <div className={styles.grouping}>
              <h1 className={styles.groupHeader}>Offers Claimed:</h1>
              <p className={styles.infoItem}>{event?.QREvents.length}/{event?.QRQuntity}</p>
            </div>
          </div>

        <div className={styles.dateAndTime}>
          <div className={styles.grouping}>
            <h1 className={styles.groupHeader}>Date:</h1>
            <p className={styles.infoItem}>{formatDate}</p>
          </div>
          <div className={styles.grouping}>
            <h1 className={styles.groupHeader}>Time:</h1>
            <p className={styles.infoItem}>{event?.startTime}</p>
          </div>
        </div>
        </div>

    <p>{event?.description}</p>

      </div>

      <div className={styles.buttonsContainer}>
        <button className={styles.shareButton}>SHARE</button>
        <button className={styles.claimButton}>CLAIM</button>
      </div>








      <div className={styles.card}>
      <MainHeader title={"Venue"} />
      <Link href={`/${event?.venue.id}`}>
      <MainHeader title={event!.venue.name} />
      </Link>

      <div className={styles.starsAndRating}>
        <div className={styles.stars}>{stars}</div>
          <p className={styles.reviews}>{event?.venue.reviews.length} reviews</p>
      </div>

      <Image className={styles.photo} src={event!.venue.mainPhoto} alt={event!.venue.name} height={1000} width={1000}/>

      <SubHeader title={"About venue:"} />
      <p className={styles.aboutVenue}>{event?.venue.about}</p>

      <div className={styles.categories}>
        {event?.venue.category1 && <p className={styles.category}>{event?.venue.category1}</p>}
        {event?.venue.category2 && <p className={styles.category}>{event?.venue.category2}</p>}
        {event?.venue.category3 && <p className={styles.category}>{event?.venue.category3}</p>}
      </div>

      </div>







    </Container>
  );
};

export default EventShowPage;
