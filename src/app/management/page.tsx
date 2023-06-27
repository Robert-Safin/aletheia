import Container from "@/components/containers/Container";
import styles from "./page.module.css";
import { PrismaClient } from "@prisma/client";
import useCustomServerSession from "@/lib/useCustomServerSession";
import LoginButton from "@/components/authButtons/LogInButton";
import RegisterVenueButton from "@/components/venueOwnersComponents/RegisterVenueButton";

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

const ManagementPage = async () => {
  const session = await useCustomServerSession();

  if (!session) {
    return (
      <Container>
        <h1>Not logged in</h1>
        <LoginButton/>
      </Container>
    )
  }

  if (!session.user?.isVenueOwner) {
    return (
      <Container>
        <h1>User {session.user?.name} does not have venues</h1>
        <p>Register you venue on Aletheia</p>
        <RegisterVenueButton/>
      </Container>
    )
  }

  const venues = await getOwnersVenues(Number(session.user.id));

  return (
    <Container>
      <h1>Management Page</h1>
      {venues.map((venue) => (
        <div className={styles.venue} key={venue.id}>
          <h2>{venue.name}</h2>
        </div>
      ))}
    </Container>
  );
};

export default ManagementPage;
