"use client";

import styles from './UpdateVenueInformation.module.css'
import MainHeader from "@/components/headers/MainHeader";
import FormLabel from "@/components/forms/FormLabel";
import FormInput from "@/components/forms/FormInput";
import { FC, FormEvent, useRef, useState, useTransition } from "react";

import useCustomClientSession from "@/lib/useCustomClientSession";
import MissingClientSession from "@/components/missingClientSession/MissingClientSession";
import LoadingSession from "@/components/loading/LoadingSession";
import FormSubmitButton from "@/components/forms/FormSubmitButton";
import ErrorPopup from "@/components/popups/ErrorPopup";
import { useRouter } from 'next/navigation';

export interface VenueUpdateForm {
  venueId: string
  name: string;
  category1: string;
  category2: string;
  category3: string;
  phone: string;
  website: string;
  about: string;
  address: string;
}

interface Props {
  venueId: string
}


const UpdateVenueInformation:FC<Props>= (props) => {
  const session = useCustomClientSession();
  const [isDisabled, setIsDisabled] = useState(false);
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const [transition, startTransition] = useTransition()

  const router = useRouter();

  const nameRef = useRef<HTMLInputElement>(null);
  const categoryRef1 = useRef<HTMLInputElement>(null);
  const categoryRef2 = useRef<HTMLInputElement>(null);
  const categoryRef3 = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const websiteRef = useRef<HTMLInputElement>(null);
  const aboutRef = useRef<HTMLTextAreaElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);

  if (session.status === "loading") {
    return <LoadingSession />;
  }

  if (session.status === "unauthenticated") {
    return <MissingClientSession />;
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsDisabled(true);




    const formData: VenueUpdateForm = {
      venueId: props.venueId,
      name: nameRef.current!.value.trim(),
      category1: categoryRef1.current!.value.trim(),
      category2: categoryRef2.current!.value.trim(),
      category3: categoryRef3.current!.value.trim(),
      phone: phoneRef.current!.value.trim(),
      website: websiteRef.current!.value.trim(),
      about: aboutRef.current!.value.trim(),
      address: addressRef.current!.value.trim(),
    };

    const response = await fetch("/api/update-venue-information", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const serverResponse = await response.json();
    const serverFailure = serverResponse.failure;
    const serverMessage = serverResponse.message;

    if (serverFailure >= 1) {
      setIsDisabled(false);
      setPopup(true);
      setTimeout(() => {
        setPopup(false);
      }, 2000);
      setPopupMessage(serverMessage);
    } else {
      router.push("/management");
    }


  };

  return (
    <>
      <MainHeader title="Register Venue" />

      <form className={styles.form} onSubmit={handleSubmit}>
        <FormLabel title="Venue Name" htmlFor="Venue Name" />
        <FormInput
          name="Venue Name"
          type="text"
          placeholder="Bobs giant cock"
          ref={nameRef}
          value={undefined}
        />
        <FormLabel title="About Venue" htmlFor="" />
        <textarea
          className={styles.textArea}
          rows={5}
          name="about"
          placeholder="About"
          ref={aboutRef}
          value={undefined}
        />

        <FormLabel title="Category 1" htmlFor="category1" />
        <FormInput
          name="category1"
          type="text"
          placeholder="Category 1"
          ref={categoryRef1}
          value={undefined}
        />
        <FormLabel title="Category 2" htmlFor="category2" />
        <FormInput
          name="category2"
          type="text"
          placeholder="Category 2"
          ref={categoryRef2}
          value={undefined}
        />
        <FormLabel title="Category 3" htmlFor="category3" />
        <FormInput
          name="category3"
          type="text"
          placeholder="Category 3"
          ref={categoryRef3}
          value={undefined}
        />

        <FormLabel title="Address" htmlFor="address" />
        <FormInput
          name="address"
          type="text"
          placeholder="Address"
          ref={addressRef}
          value={undefined}
        />

        <FormLabel title="Contact Number" htmlFor="phone" />
        <FormInput
          name="phone"
          type="text"
          placeholder="Contact Number"
          ref={phoneRef}
          value={undefined}
        />

        <FormLabel title="Website URL" htmlFor="website" />
        <FormInput
          name="website"
          type="text"
          placeholder="Website URL"
          ref={websiteRef}
          value={undefined}
        />



        <FormSubmitButton title="Update" isDisabled={isDisabled} />
      </form>
      {popup && <ErrorPopup message={popupMessage} />}
    </>
  );
};



export default UpdateVenueInformation
