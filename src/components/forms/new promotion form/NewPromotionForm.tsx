import { FC } from "react";

import "react-datepicker/dist/react-datepicker.css";

import FormSelection from "./FormSelection";
import { ReccuringOfferForm } from "./one time type/ReccuringForm";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { OnceOfferForm } from "./recurring type/OnceForm";

interface Props {
  venueId: string;
  formFor: "offer" | "event";
}

const NewPromotionForm: FC<Props> = async (props) => {
  const submitRecurringOfferForm = async (form: ReccuringOfferForm) => {
    "use server";
    const prisma = new PrismaClient();
    const type = props.formFor;
    if (type === "offer") {
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
          photos: {
            create: [{
              publicId: form.photoURL,
              url: form.photoURL
            }]
          }
        },
      });

      await prisma.$disconnect();

      if (!newOffer) {
        console.log("error creating offer");
      }
      revalidatePath("/management");
      redirect("/management");
    }
    if (type === "event") {
      const newEvent = await prisma.event.create({
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
          photos: {
            create: [
              {
                publicId: form.photoURL,
                url: form.photoURL,
              },
            ],
          },
        },
      });

      await prisma.$disconnect();

      if (!newEvent) {
        console.log("error creating event");
      }
      revalidatePath("/management");
      redirect("/management");
    }
  };

  const submitOnceOfferForm = async (form: OnceOfferForm) => {
    "use server";

    const prisma = new PrismaClient();
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
        photos: {
          create: [
            {
              url: form.photoURL,
              publicId: form.photoURL,
            },
          ],
        },
      },
    });

    await prisma.$disconnect();

    if (!newOffer) {
      console.log("error creating offer");
    }
    revalidatePath("/management");
    redirect("/management");
  };

  return (
    <>
      <FormSelection
        submitRecurringOfferForm={submitRecurringOfferForm}
        submitOnceOfferForm={submitOnceOfferForm}
      />
    </>
  );
};

export default NewPromotionForm;
