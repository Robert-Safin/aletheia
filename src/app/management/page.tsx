import Container from "@/components/containers/Container";
import styles from "./page.module.css";
import { PrismaClient } from "@prisma/client";
import useCustomServerSession from "@/lib/useCustomServerSession";
import LoginButton from "@/components/authButtons/LogInButton";
import MainHeader from "@/components/headers/MainHeader";
import VenueManagementCard from "@/components/management/venueManagementCard/VenueManagementCard";
import { LuVerified } from "react-icons/lu";
import { AiOutlineClockCircle } from "react-icons/ai";
import UnverifiedVenueManagementCard from "@/components/management/unverifiedVenueManagementCard/UnverifiedVenueManagementCard";
import RegisterVenueButton from "@/components/venueOwnersComponents/buttons/RegisterVenueButton";
import { redirect } from "next/navigation";
const getOwnersVenues = async (id: number) => {
  const prisma = new PrismaClient();
  const venues = await prisma.venue.findMany({
    where: {
      ownerId: id,
    },
    include: {
      reviews: true,
      offers: true,
      events: true,
    }
  });

  await prisma.$disconnect();
  return venues;
};

const getCurrentUser = async (id: number) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  await prisma.$disconnect();
  return user;
};

const ManagementPage = async () => {
  const session = await useCustomServerSession();

  if (!session) {
    redirect('/')
  }

  const user = await getCurrentUser(Number(session.user!.id));
  const venues = await getOwnersVenues(Number(session.user!.id));

  if (venues.length === 0) {
    return (
      <Container>
        <h1>User {session.user?.name} does not have venues</h1>
        <p>Register you venue on Aletheia</p>
        <RegisterVenueButton />
      </Container>
    );
  }

  const verifiedVenues = venues.filter(
    (venue) => venue.isVerified
  )
  const unverifiedVenues = venues.filter(
    (venue) => !venue.isVerified
  )

  return (
    <Container>
      <div className={styles.welcomeContainer}>

        <h2 className={styles.welcome}>Welcome,</h2>
        <h1 className={styles.username}>{user?.name}</h1>
        <p className={styles.date}>Joined:{user!.createAt.toLocaleDateString()}</p>

        <div className={styles.venueCountContainer}>
          <div className={styles.iconAndCount}>
            <LuVerified  className={styles.icon}/>
            <p className={styles.venueCount}>{verifiedVenues.length} Verified Venues</p>
          </div>
          <div className={styles.iconAndCount}>
            <AiOutlineClockCircle  className={styles.icon}/>
            <p className={styles.venueCount}>{unverifiedVenues.length} Unverified Venues</p>
          </div>
        </div>
        <RegisterVenueButton />
      </div>

      <MainHeader title="Your Venues"/>

      {verifiedVenues.map((venue) => (
        <VenueManagementCard key={venue.id} venue={venue} />
      ))}


      <MainHeader title="Waiting Approval"/>

      {unverifiedVenues.map((venue) => (
        <UnverifiedVenueManagementCard key={venue.id} venue={venue} />
      ))}


    </Container>
  );
};

export default ManagementPage;
