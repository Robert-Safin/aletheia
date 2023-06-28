"use client";

import Container from "@/components/containers/Container";
import styles from "./page.module.css";
import MainHeader from "@/components/headers/MainHeader";
import FormLabel from "@/components/forms/FormLabel";
import FormInput from "@/components/forms/FormInput";
import { FormEvent, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useCustomClientSession from "@/lib/useCustomClientSession";
import MissingClientSession from "@/components/missingClientSession/MissingClientSession";
import LoadingSession from "@/components/loading/LoadingSession";
import FormSubmitButton from "@/components/forms/FormSubmitButton";
import RegistrationPopup from "@/components/popups/RegistrationPopup";

export interface VenueRegistrationForm {
  name: string;
  category: string;
  about: string;
  address: string;
  photo: File;
}

const RegisterVenuePage = () => {
  const [quill, setQuill] = useState("");
  const session = useCustomClientSession();
  const [isDisabled, setIsDisabled] = useState(false);
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const nameRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);

  if (session.status === "loading") {
    return <LoadingSession />;
  }

  if (session.status === "unauthenticated") {
    return <MissingClientSession />;
  }

  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ align: [] }],
      ["link"],
      ["clean"],
      //['blockquote', 'code-block'],
      //[{ 'header': 1 }, { 'header': 2 }],
      //[{ 'script': 'sub'}, { 'script': 'super' }],
      //[{ 'indent': '-1'}, { 'indent': '+1' }],
      //[{ 'direction': 'rtl' }],
      //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      //[{ 'color': [] }, { 'background': [] }],
      //[{ 'font': [] }],
    ],
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsDisabled(true);

  const file = photoRef.current!.files![0];
  const validImageTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!validImageTypes.includes(file.type)) {
    // The file is not an accepted image type
    setPopupMessage("Please upload .jpeg/.png/.webp files only");
    setPopup(true);
    setTimeout(() => {
      setPopup(false);
    }, 2000);
    setIsDisabled(false);
    return; // Don't submit the form
  }

    const formData: VenueRegistrationForm = {
      name: nameRef.current!.value.trim(),
      category: categoryRef.current!.value.trim(),
      about: quill.trim(),
      address: addressRef.current!.value.trim(),
      photo: photoRef.current!.files![0]
    };


    setIsDisabled(false);

    // const response = await fetch('api/auth/register', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(formData)
    // })

    // const serverResponse = await response.json()
    // const serverFailure = serverResponse.failure
    // const serverMessage = serverResponse.message

    // if (serverFailure >= 1) {
    //   setFormIsSubmitted(false)
    //   setPopup(true)
    //   setTimeout(() => {
    //     setPopup(false)
    //   }, 2000);
    //   setPopupMessage(serverMessage)
    // }
  };

  return (
    <Container>
      <MainHeader title="Register Venue" />

      <form className={styles.form} onSubmit={handleSubmit}>
        <FormLabel title="Venue Name" htmlFor="Venue Name" />
        <FormInput
          name="Venue Name"
          type="text"
          placeholder="Bobs giant cock"
          ref={nameRef}
        />

        <FormLabel title="Category" htmlFor="category" />
        <FormInput name="category" type="text" placeholder="Category" ref={categoryRef}/>

        <FormLabel title="About Venue" htmlFor="" />
        <ReactQuill
          value={quill}
          onChange={setQuill}
          modules={modules}
          className={styles.quill}
        />

        <FormLabel title="Address" htmlFor="address" />
        <FormInput
          name="address"
          type="text"
          placeholder="Address"
          ref={addressRef}
        />

        <input
          type="file"
          id="file"
          className={styles.photoInput}
          ref={photoRef}
        />
        <label htmlFor="file" className={styles.photoLabel}>Upload a photo</label>

        <FormSubmitButton title="Register" isDisabled={isDisabled} />
      </form>
      {popup && <RegistrationPopup message={popupMessage} />}
    </Container>
  );
};

export default RegisterVenuePage;
