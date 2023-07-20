"use client";
import { FC, FormEvent, useRef, useState, useTransition } from "react";
import styles from "./UpdateVenuePhoto.module.css";
import { redirect } from "next/navigation";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { IoCloseCircleSharp } from "react-icons/io5";
import ErrorPopup from "@/components/popups/ErrorPopup";
import MainHeader from "@/components/headers/MainHeader";
import { Photo } from "@prisma/client";
import FormLabel from "@/components/forms/FormLabel";


export type MyFile = File & { preview?: string };

interface Props {
  updateVenuePhotos: (photos: { url: string; public_id: string }[]) => void;
}


const UpdateVenuePhotoForm: FC<Props> = (props) => {


  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [transition, startTransiton] = useTransition()

  const [uploadedImages, setUploadedImages] = useState<
    { url: string; public_id: string }[]
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
    <div key={index}>
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);

    if (files.length === 0) {
      setPopupMessage("You must upload at least one photo");
      setPopup(true);
      setTimeout(() => {
        setPopup(false);
      }
      , 2000);
      setIsDisabled(false);
      return;
    }




    let tempUploadedImages: { url: string; public_id: string }[] = [];

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
          url: cloudinaryResponseData.secure_url,
          public_id: cloudinaryResponseData.public_id,
        });
      }
    }

    setUploadedImages(tempUploadedImages);



    startTransiton(() =>  props.updateVenuePhotos(tempUploadedImages))


    setIsDisabled(false);
  };

  return (
    <>
    <form className={styles.form} onSubmit={handleSubmit}>
      <MainHeader title="Update Venue Photos"/>
      <FormLabel title="Venue Images (.png, .jpeg, or .webp)" htmlFor="null"/>
    <section>
          <div
            {...getRootProps({
              className: "dropzone",
              style: {
                border: "1px dashed black",
                padding: "20px",
                textAlign: "center",
                margin: "20px 0",
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
      <button className={styles.submit} type="submit" disabled={isDisabled}>
        UPDATE
      </button>
    </form>
    {popup && <ErrorPopup message={popupMessage} />}
    </>
  );
};

export default UpdateVenuePhotoForm;
