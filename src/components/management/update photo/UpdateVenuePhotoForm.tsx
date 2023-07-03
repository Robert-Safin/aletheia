"use client";
import { FC, FormEvent, useRef, useState, useTransition } from "react";
import styles from "./UpdateVenuePhoto.module.css";
import { PiUploadSimpleBold } from "react-icons/pi";
import { redirect } from "next/navigation";

interface Props {
  updateVenuePhoto: (photoUrl: string) => void;
}


const UpdateVenuePhotoForm: FC<Props> = (props) => {
  const photoRef = useRef<HTMLInputElement>(null);

  const [transition, startTransiton] = useTransition()

  const [photoInputPlaceholder, setPhotoInputPlaceholder] = useState(
    <>
      <PiUploadSimpleBold />
      <p>Upload</p>
    </>
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!photoRef.current!.files![0]) {
      return
    }
    const file = photoRef.current!.files![0];
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

    const secureUrl = cloudinaryResponseData.secure_url;

    startTransiton(() =>  props.updateVenuePhoto(secureUrl))

  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.photoLabel} htmlFor="photo">
        Upload Image (.png, .jpeg, or .webp)
        <div className={styles.photoIconAndTextWrapper}>
          <div className={styles.photoIconAndText}>
            {photoInputPlaceholder}
            <input
              id="photo"
              name="photo"
              type="file"
              className={styles.photoInput}
              accept=".png, .jpeg, .webp"
              ref={photoRef}
              onChange={() => {
                setPhotoInputPlaceholder(
                  <>
                    <p>{photoRef.current?.files![0] ? photoRef.current!.files![0].name : <span>No image</span> }</p>
                  </>
                );
              }}
            />
          </div>
        </div>
      </label>
      <button className={styles.submit} type="submit">
        Submit
      </button>
    </form>
  );
};

export default UpdateVenuePhotoForm;
