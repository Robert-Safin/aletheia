import useCustomServerSession from "@/lib/useCustomServerSession";
import styles from "./page.module.css";
import Container from "@/components/containers/Container";
import LoginButton from "@/components/authButtons/LogInButton";
import MainHeader from "@/components/headers/MainHeader";
import { PrismaClient } from "@prisma/client";
import UnverifiedVenueCard from "@/components/admin/UnverifiedVenueCard";

const getUser = async (id: number) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  prisma.$disconnect();
  return user;
};

const getUnverifiedVenues = async () => {
  const prisma = new PrismaClient();
  const unverifiedVenues = await prisma.venue.findMany({
    where: {
      isVerified: false,
    },
  });
  prisma.$disconnect();
  return unverifiedVenues;
};

const AdminPage: React.FC = async () => {
  const session = await useCustomServerSession();

  if (!session) {
    return (
      <Container>
        <MainHeader title="Please Authenticate" />
        <LoginButton />
      </Container>
    );
  }

  if (session) {
    const user = await getUser(Number(session.user?.id));

    if (!user?.isAdmin) {
      return (
        <Container>
          <MainHeader title="Not Authorized" />
        </Container>
      );
    } else {
      const unverifiedVenues = await getUnverifiedVenues();

      const handleVerify = async (id: number) => {
        "use server";
        console.log(id);
      };

      const handleDecline = async (id: number) => {
        "use server";
        console.log(id);
      };

      return (
        <Container>
          <MainHeader title="Admin Page" />
          <div className={styles.tableContainer}>
            <div className={styles.tableHeader}>
              <h1 className={styles.header}>Name</h1>
              <h1 className={styles.header}>Categories</h1>
              <h1 className={styles.header}>About</h1>
              <h1 className={styles.header}>F.Address</h1>
              <h1 className={styles.header}>City</h1>
              <h1 className={styles.header}>Photo Url</h1>
              <h1 className={styles.header}>Approve</h1>
              <h1 className={styles.header}>Deny</h1>
            </div>
            {unverifiedVenues.map((venue) => (
              <UnverifiedVenueCard
                key={venue.id}
                venue={venue}
                handleVerify={handleVerify}
                handleDecline={handleDecline}
              />
            ))}
          </div>
        </Container>
      );
    }
  }
};

export default AdminPage;
