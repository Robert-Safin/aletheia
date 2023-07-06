import styles from "./page.module.css";
import { FC } from "react";
import Container from "../../components/containers/Container";
import MainHeader from "../../components/headers/MainHeader";
import { PrismaClient } from "@prisma/client";
import { BiSolidStarHalf, BiWalk } from "react-icons/bi";
import Image from "next/image";
import SubHeader from "../../components/headers/SubHeader";
import { BsCalendarEvent } from "react-icons/bs";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import XScrollContainer from "@/components/home page/x-scroll card container/XScrollContainer";
import UpcomingEvent from "@/components/home page/upcoming events/UpcomingEvent";
interface Props {
  params: {
    venueId: string;
  };
}

export const getVenue = async (id: number) => {
  const prisma = new PrismaClient();
  const venue = await prisma.venue.findUnique({
    where: {
      id: id,
    },
    include: {
      reviews: true,
      events: {
        include: {
          venue: true,
        },
      },
      offers: {
        include: {
          venue: true,
        },
      },
    },
  });
  await prisma.$disconnect();
  return venue;
};

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

const VenueShowPage: FC<Props> = async (props) => {
  const venue = await getVenue(Number(props.params.venueId));
  const stars = getRating(venue?.averageRating!);
  console.log(venue?.events);


  return (
    <Container>
      <div className={styles.headerWithIcon}>
        <BiWalk className={styles.icon} />
        <MainHeader title="Top Places Near You" />
      </div>

      <div className={styles.contentCard}>
        <MainHeader title={venue!.name} />

        <Image
          className={styles.photo}
          src={venue!.mainPhoto}
          alt={venue!.name}
          width={1000}
          height={1000}
        />
        <div className={styles.startsAndReview}>
          <div className={styles.stars}>{stars}</div>
          <p className={styles.reviews}>{venue?.reviews.length} Reviews</p>
        </div>

        <SubHeader title={`Aboout ${venue!.name}:`} />
        <p>{venue?.about}</p>
      </div>

      <div className={styles.contentCard}>
        <div className={styles.headerWithIcon}>
          <BsCalendarEvent className={styles.icon} />
          <MainHeader title="Upcoming Events" />
        </div>
        <XScrollContainer>
          {venue!.events.map((event) => <UpcomingEvent key={event.id} event={event}/>)}
        </XScrollContainer>
      </div>
    </Container>
  );
};

export default VenueShowPage;
