
import { FC,} from "react";

import "react-datepicker/dist/react-datepicker.css";

import FormSelection from "./FormSelection";
import { ReccuringOfferForm } from "./one time type/ReccuringForm";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { OnceOfferForm } from "./recurring type/OnceForm";

interface Props {
  venueId: string;
}

const NewPromotionForm:FC<Props> = async (props) => {


  const submitRecurringOfferForm = async (form:ReccuringOfferForm) => {
    "use server"
    const prisma = new PrismaClient()
    const newOffer = await prisma.offer.create({
      data: {
        isRecurring: true,
        name: form.name,
        startDate: form.startDate,
        endDate: form.endDate,
        startTime: form.startTime,
        endTime: form.endTime,
        onMonday: form.monday,
        onTuesday: form.tuesday,
        onWednesday: form.wednesday,
        onThursday: form.thursday,
        onFriday: form.friday,
        onSaturday: form.saturday,
        onSunday: form.sunday,
        description: form.details,
        QRQuntity: form.quantity,
        venueId: Number(props.venueId),
        photo: form.photoURL
      }
    })

    await prisma.$disconnect()

    if (!newOffer) {
      console.log('error creating offer');
    }
    revalidatePath('/management')
    redirect('/management')
  }

  const submitOnceOfferForm = async (form:OnceOfferForm) => {
    "use server"

    console.log(form);

    const prisma = new PrismaClient()
    const newOffer = await prisma.offer.create({
      data: {
        isRecurring: false,
        name: form.name,
        startDate: form.startDate,
        startTime: form.startTime,
        endTime: form.endTime,
        description: form.details,
        QRQuntity: form.quantity,
        venueId: Number(props.venueId),
        photo: form.photoURL
      }
    })

    await prisma.$disconnect()

    if (!newOffer) {
      console.log('error creating offer');
    }
    revalidatePath('/management')
    redirect('/management')
  }

  return (
    <>
      <FormSelection submitRecurringOfferForm={submitRecurringOfferForm} submitOnceOfferForm={submitOnceOfferForm}/>
    </>
  );
};

export default NewPromotionForm;
