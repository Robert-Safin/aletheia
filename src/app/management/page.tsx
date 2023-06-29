import Container from "@/components/containers/Container";
import styles from "./page.module.css";
import { PrismaClient } from "@prisma/client";
import useCustomServerSession from "@/lib/useCustomServerSession";
import LoginButton from "@/components/authButtons/LogInButton";
import RegisterVenueButton from "@/components/venueOwnersComponents/RegisterVenueButton";
import MainHeader from "@/components/headers/MainHeader";

const getOwnersVenues = async (id: number) => {
  const prisma = new PrismaClient();
  const venues = await prisma.venue.findMany({
    where: {
      ownerId: id,
    },
  });

  prisma.$disconnect();
  return venues;
};


const getCurrentUser = async (id: number) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  prisma.$disconnect();
  return user;
}

const ManagementPage = async () => {
  const session = await useCustomServerSession();
  const user = await getCurrentUser(Number(session.user!.id));

  if (!session) {
    return (
      <Container>
        <h1>Not logged in</h1>
        <LoginButton/>
      </Container>
    )
  }

  const venues = await getOwnersVenues(Number(session.user!.id));

  if (venues.length === 0) {
    return (
      <Container>
        <h1>User {session.user?.name} does not have venues</h1>
        <p>Register you venue on Aletheia</p>
        <RegisterVenueButton/>
      </Container>
    )
  }


  return (
    <Container>
      <MainHeader title="Management Page"/>
      {venues.map((venue) => (
        <div className={styles.venue} key={venue.id}>
          <h2>{venue.name}</h2>
        </div>
      ))}

      <MainHeader title="Register another venue"/>
      <RegisterVenueButton/>


    </Container>
  );
};

export default ManagementPage;
