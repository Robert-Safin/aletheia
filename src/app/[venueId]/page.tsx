import styles from "./page.module.css";
import { FC } from "react";
import Container from "../../components/containers/Container";
import MainHeader from "../../components/headers/MainHeader";
import { PrismaClient } from "@prisma/client";
import { BiSolidStarHalf, BiWalk } from "react-icons/bi";
import Image from "next/image";
import SubHeader from "../../components/headers/SubHeader";
import { BsCalendarEvent } from "react-icons/bs";
import { AiFillStar, AiOutlineStar, AiOutlineTag } from "react-icons/ai";
import XScrollContainer from "@/components/home page/x-scroll card container/XScrollContainer";
import UpcomingEvent from "@/components/home page/upcoming events/UpcomingEvent";
import UpcomingOffer from "@/components/home page/upcoming offer/UpcomingOffer";
import ImageCarousel from "@/components/image carousel/Carousel";

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
      photos: true,
      reviews: true,
      events: {
        include: {
          venue: true,
          photos: true,
        },
      },
      offers: {
        include: {
          venue: true,
          photos: true,
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


  return (
    <Container>

      <div className={styles.contentCard}>
        <MainHeader title={venue!.name} />

        <ImageCarousel photos={venue!.photos}/>
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

      <div className={styles.contentCard}>
        <div className={styles.headerWithIcon}>
          <AiOutlineTag className={styles.icon} />
          <MainHeader title="Upcoming Offers" />
        </div>
        <XScrollContainer>
          {venue!.offers.map((offer) => <UpcomingOffer key={offer.id} offer={offer}/>)}
        </XScrollContainer>
      </div>

    </Container>
  );
};

export default VenueShowPage;
