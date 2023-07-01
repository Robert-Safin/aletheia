import useCustomServerSession from "@/lib/useCustomServerSession";
import styles from "./page.module.css";
import Container from "@/components/containers/Container";
import LoginButton from "@/components/authButtons/LogInButton";
import MainHeader from "@/components/headers/MainHeader";
import { PrismaClient } from "@prisma/client";
import UnverifiedVenueCard from "@/components/admin/UnverifiedVenueCard";
import { revalidatePath } from "next/cache";

const getUser = async (id: number) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  await prisma.$disconnect();
  return user;
};

const getUnverifiedVenues = async () => {
  const prisma = new PrismaClient();
  const unverifiedVenues = await prisma.venue.findMany({
    where: {
      isVerified: false,
    },
  });
  await prisma.$disconnect();
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
        const prisma = new PrismaClient();
        await prisma.venue.update({
          where: {
            id: id,
          },
          data: {
            isVerified: true,
          },
        });
        await prisma.$disconnect();
        revalidatePath('/admin')
      };

      const handleDecline = async (id: number) => {
        "use server";
        const prisma = new PrismaClient();
        await prisma.venue.delete({
          where: {
            id: id,
          },
        });
        await prisma.$disconnect();
        revalidatePath('/admin')
      };

      return (
        <Container>
          <MainHeader title="Admin Page" />
          <div className={styles.tableContainer}>
            <div className={styles.tableHeader}>
              <h1 className={styles.header}>Name</h1>
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
