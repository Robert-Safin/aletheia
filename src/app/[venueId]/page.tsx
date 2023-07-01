import styles from "./page.module.css";
import { FC } from "react";
import Container from "../../components/containers/Container";
import MainHeader from "../../components/headers/MainHeader";
import { PrismaClient } from "@prisma/client";
import { BiWalk } from "react-icons/bi";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import SubHeader from "../../components/headers/SubHeader";
import { BsCalendarEvent } from "react-icons/bs";
import CardContainer from "../../components/homePage/CardContainer";
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
      events: true,
      offers: true,
    },
  });
   await prisma.$disconnect();
  return venue;
};

  const getRating = (averageRating: number) => {
  let stars: any = [];
  for (let i = 0; i < averageRating; i++) {
    stars.push(<AiFillStar className={styles.starIcon} />);
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
      <div className={styles.headerWithIcon}>
        <BiWalk className={styles.icon} />
        <MainHeader title="Top Places Near You" />
      </div>

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

      <SubHeader title={`Aboout ${venue!.name}:`}/>
      <p>{venue?.about}</p>

      <div className={styles.headerWithIcon}>
        <BsCalendarEvent className={styles.icon} />
        <MainHeader title="Upcoming Events" />
      </div>

      <CardContainer>
        {/* {"to do"} */}

      </CardContainer>

    </Container>
  );
};

export default VenueShowPage;
