"use client";

import styles from "./RegisterVenueForm.module.css";
import MainHeader from "@/components/headers/MainHeader";
import FormLabel from "@/components/forms/FormLabel";
import FormInput from "@/components/forms/FormInput";
import { FormEvent, useRef, useState } from "react";

import useCustomClientSession from "@/lib/useCustomClientSession";
import MissingClientSession from "@/components/missingClientSession/MissingClientSession";
import FormSubmitButton from "@/components/forms/FormSubmitButton";
import ErrorPopup from "@/components/popups/ErrorPopup";
import { useRouter } from "next/navigation";
import { ImUpload } from "react-icons/im";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

import { IoCloseCircleSharp } from "react-icons/io5";
type MyFile = File & { preview?: string };

export interface VenueRegistrationForm {
  name: string;
  category1: string;
  category2: string;
  category3: string;
  phone: string;
  website: string;
  about: string;
  address: string;
  photos: { secure_url: string; public_id: string }[];
}

const RegisterVenueForm = () => {
  const router = useRouter();
  const session = useCustomClientSession();
  const [isDisabled, setIsDisabled] = useState(false);
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const [uploadedImages, setUploadedImages] = useState<
    { secure_url: string; public_id: string }[]
  >([]);

  const [files, setFiles] = useState<MyFile[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png", ".webp", ".jpeg"],
    },
    maxFiles: 6,
    onDrop: (acceptedFiles) => {
      const remainingSlots = 6 - files.length;
      const filesToBeAdded = acceptedFiles.slice(0, remainingSlots);

      if (remainingSlots <= 0) {
        setPopupMessage("You can only upload 6 photos");
        setPopup(true);
        setTimeout(() => {
          setPopup(false);
        }, 2000);
        return;
      }

      setFiles((prevFiles) => [
        ...prevFiles,
        ...filesToBeAdded.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
  });

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    URL.revokeObjectURL(newFiles[index].preview!);
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const thumbs = files.map((file: MyFile, index: number) => (
    <div key={file.name}>
      <Image
        src={file.preview!}
        alt="preview"
        width={500}
        height={500}
        className={styles.thumbImage}
      />
      <IoCloseCircleSharp
        className={styles.thumbDelete}
        onClick={() => handleRemoveFile(index)}
      >
        Delete
      </IoCloseCircleSharp>
    </div>
  ));

  const nameRef = useRef<HTMLInputElement>(null);
  const categoryRef1 = useRef<HTMLInputElement>(null);
  const categoryRef2 = useRef<HTMLInputElement>(null);
  const categoryRef3 = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const websiteRef = useRef<HTMLInputElement>(null);
  const aboutRef = useRef<HTMLTextAreaElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);

  if (session.status === "unauthenticated") {
    return <MissingClientSession />;
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsDisabled(true);

    if (files.length === 0) {
      setPopupMessage("Please attach at least one photo");
      setPopup(true);
      setTimeout(() => {
        setPopup(false);
      }, 2000);
      setIsDisabled(false);
      return;
    }

    let tempUploadedImages: { secure_url: string; public_id: string }[] = [];

    for (const file of files) {
      const formDataCloudinary = new FormData();
      formDataCloudinary.append("file", file);
      formDataCloudinary.append("upload_preset", "aletheia");

      const responseCloudinary = await fetch(
        `https://api.cloudinary.com/v1_1/dxgkclowd/upload`,
        {
          method: "POST",
          body: formDataCloudinary,
        }
      );

      const cloudinaryResponseData = await responseCloudinary.json();

      if (
        cloudinaryResponseData.secure_url &&
        cloudinaryResponseData.public_id
      ) {
        tempUploadedImages.push({
          secure_url: cloudinaryResponseData.secure_url,
          public_id: cloudinaryResponseData.public_id,
        });
      }
    }

    setUploadedImages(tempUploadedImages);

    const formData: VenueRegistrationForm = {
      name: nameRef.current!.value.trim(),
      category1: categoryRef1.current!.value.trim(),
      category2: categoryRef2.current!.value.trim(),
      category3: categoryRef3.current!.value.trim(),
      phone: phoneRef.current!.value.trim(),
      website: websiteRef.current!.value.trim(),
      about: aboutRef.current!.value.trim(),
      address: addressRef.current!.value.trim(),
      photos: tempUploadedImages,
    };

    const response = await fetch("/api/register-venue", {
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

        <h1 className={styles.photoFakeLabel}>Photo</h1>
        <section>
          <div
            {...getRootProps({
              className: "dropzone",
              style: {
                border: "1px dashed black",
                padding: "20px",
                textAlign: "center",
              },
            })}
          >
            <input {...getInputProps()} />
            <p>Tap to select images</p>
          </div>
          <aside
            style={{ display: "flex", flexDirection: "row", overflowX: "auto" }}
          >
            <div className={styles.thumbsContainer}>{thumbs}</div>
          </aside>
        </section>

        <FormSubmitButton title="SUBMIT" isDisabled={isDisabled} />
      </form>
      {popup && <ErrorPopup message={popupMessage} />}
    </>
  );
};

export default RegisterVenueForm;
