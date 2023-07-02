import { FC } from "react";
import styles from './page.module.css'
import Container from "@/components/containers/Container";
import NewPromotionForm from "@/components/forms/new promotion form/NewPromotionForm";
import { PrismaClient, Venue } from "@prisma/client";
import { redirect } from "next/navigation";
import useCustomServerSession from "@/lib/useCustomServerSession";
import MainHeader from "@/components/headers/MainHeader";

interface Props {

  params: {
    venueId: string;
  };
}
const userIsVenueOwner = async (venueId: string, userId: Number) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
    include: {
      venues: true,
    },
  });
  const userIsVenueOwner = user?.venues.some(
    (venue) => venue.id === Number(venueId)
  );
  return userIsVenueOwner;
};

const NewEventPage: FC<Props> = async (props) => {

  const session = await useCustomServerSession();
  if (!session) {
    redirect("/");
  }
  const userId = session.user?.id;

  const isAuthorized = await userIsVenueOwner(
    props.params.venueId,
    Number(userId)
  );

  if (!isAuthorized) {
    return <MainHeader title="not authorized" />;
  }

  return (
    <Container>
      <NewPromotionForm venueId={props.params.venueId}/>
    </Container>
  );
};


export default NewEventPage;
