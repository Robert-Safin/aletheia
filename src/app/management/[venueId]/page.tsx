import { FC } from "react";
import styles from "./page.module.css";
import Container from "@/components/containers/Container";
import { getVenue } from "@/app/[venueId]/page";
import Image from "next/image";
import useCustomServerSession from "@/lib/useCustomServerSession";
import MissingClientSession from "@/components/missingClientSession/MissingClientSession";
import { PrismaClient } from "@prisma/client";
import MainHeader from "@/components/headers/MainHeader";
import { AiFillStar, AiOutlineCalendar, AiOutlineStar, AiOutlineTag } from "react-icons/ai";
import SubHeader from "@/components/headers/SubHeader";
import Link from "next/link";
import { GoLinkExternal } from "react-icons/go";
import UpdateVenueButton from "@/components/venueOwnersComponents/updateVenueButton/UpdateVenueButton";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { BiSolidStarHalf } from "react-icons/bi";
import ImageCarousel from "@/components/image carousel/Carousel";

interface Props {
  params: {
    venueId: string;
  };
}

const isCurrentUserVenueOwner = async (userId: number) => {
  const prisma = new PrismaClient();
  const userDoc = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      venues: true,
    },
  });
  await prisma.$disconnect();

  const isCurrentUserVenueOwner = userDoc?.venues.some(
    (venue) => venue.ownerId === userId
  );
  return isCurrentUserVenueOwner;
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

const MangementVenueShowPage: FC<Props> = async (props) => {
  const session = await useCustomServerSession();
  if (!session) {
    return <MissingClientSession />;
  }

  if ((await isCurrentUserVenueOwner(Number(session.user?.id))) === false) {
    return <h1>Not authorized</h1>;
  }

  const venue = await getVenue(Number(props.params.venueId));
  const stars = await getRating(venue!.averageRating);
  const hasPhone = venue?.phoneNumber !== "";
  const hasWebsite = venue?.website !== "";

  const deleteVenueById = async (venueId: number) => {
    "use server";
    const prisma = new PrismaClient();
    const venueDoc = await prisma.venue.delete({
      where: {
        id: venueId,
      },
    });
    await prisma.$disconnect();
    revalidateTag('/management')
    redirect("/management");
  };

  return (
    <Container>
      <ImageCarousel photos={venue!.photos}/>
      <MainHeader title={venue!.name} />

      <div className={styles.startsAndRating}>
        <div className={styles.stars}>{stars}</div>
        <p className={styles.reviews}>{venue?.reviews.length} Reviews</p>
      </div>

      <div className={styles.eventsAndOffers}>
        <div className={styles.iconAndCount}>
          <AiOutlineCalendar className={styles.icon} />
          <p className={styles.length}>{venue?.events.length} Events</p>
        </div>
        <div className={styles.iconAndCount}>
          <AiOutlineTag className={styles.icon} />
          <p className={styles.length}>{venue?.offers.length} Offers</p>
        </div>
      </div>

      <SubHeader title="Address" />
      <p>{venue?.formattedAddress}</p>

      {hasPhone && (
        <>
          <SubHeader title="Contact Phone Number" />
          <Link href={`tel:${venue?.phoneNumber}`} className={styles.infoText}>
            {venue?.phoneNumber}
          </Link>
        </>
      )}

      {hasWebsite && (
        <>
          <SubHeader title="Website" />
          <div className={styles.iconAndWebLink}>
            <GoLinkExternal />

            <Link href={`${venue?.website}`} className={styles.infoText}>
              Open Link
            </Link>
          </div>
        </>
      )}
      <SubHeader title="Categories" />
      <div className={styles.categories}>
        {venue?.category1.length! > 0 && (
          <p className={styles.category}>{venue?.category1}</p>
        )}
        {venue?.category2.length! > 0 && (
          <p className={styles.category}>{venue?.category2}</p>
        )}
        {venue?.category3.length! > 0 && (
          <p className={styles.category}>{venue?.category3}</p>
        )}
      </div>

      <div className={styles.newButtons}>
        <Link
          href={`/management/${venue?.id}/newOffer`}
          className={styles.newThingButton}
        >
          NEW OFFER
        </Link>
        <Link
          href={`/management/${venue?.id}/newEvent`}
          className={styles.newThingButton}
        >
          NEW EVENT
        </Link>
      </div>
      <UpdateVenueButton deleteVenueById={deleteVenueById} id={venue!.id} />
    </Container>
  );
};

export default MangementVenueShowPage;
