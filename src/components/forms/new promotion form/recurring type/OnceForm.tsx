"use client";
import styles from './OnceForm.module.css'
import { FC, FormEvent, useRef, useState, useTransition } from "react";
import FormInput from "../../FormInput";
import FormLabel from "../../FormLabel";

import DateInput from "../../DateInput";
import SubHeader from "@/components/headers/SubHeader";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { PiUploadSimpleBold } from "react-icons/pi";
import ErrorPopup from "@/components/popups/ErrorPopup";

interface Props {
  submitOnceOfferForm : (form:OnceOfferForm) => void
}

export interface OnceOfferForm {
  name: string;
  details: string
  photoURL: string;
  startDate: Date;
  startTime: string;
  endTime: string;
  isQR: boolean;
  quantity: number;
}

const OnceForm:FC<Props> = (props) => {

  const [transition, startTransition] = useTransition()




  const [startDate, setStartDate] = useState(new Date());

  const [yesIsClicked, setYesIsClicked] = useState(false);
  const [noIsClicked, setNoIsClicked] = useState(true);

  const [quantityOffers, setQuantityOffers] = useState(0);


  const nameRef = useRef<HTMLInputElement>(null);
  const detailsRef = useRef<HTMLTextAreaElement>(null);

  const photoRef = useRef<HTMLInputElement>(null);
  const startDateRefObj = startDate;
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);
  const isQR = yesIsClicked;
  const quantityRefValue = quantityOffers;



  const [photoInputPlaceholder, setPhotoInputPlaceholder] = useState(
    <>
    <PiUploadSimpleBold/>
    <p>Upload</p>
    </>
  )

  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const getStartDate = (date: Date) => {
    setStartDate(date);
  };



  const handleQRYesClick = () => {
    setYesIsClicked(true);
    setNoIsClicked(false);
  };

  const handleQRNoClick = () => {
    setYesIsClicked(false);
    setNoIsClicked(true);
  };

  const handleFileUpload = () => {
    const validImageTypes = ["image/jpeg", "image/png", "image/webp"];
    const file = photoRef.current!.files![0];

    if (!validImageTypes.includes(file.type)) {
      setPopupMessage("Please upload .jpeg/.png/.webp files only");
      setPopup(true);
      setTimeout(() => {
        setPopup(false);
      }, 2000);
      return;
    }

    setPhotoInputPlaceholder(
      <div className={styles.photoLabelInnerDiv}>{file.name}</div>
    );
  }

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault()

    //handle no name
    if (nameRef.current!.value === "") {
      setPopupMessage("Please enter a name");
      setPopup(true);
      setTimeout(() => {
        setPopup(false);
      }, 2000);
      return;
    }
    //handle name too long
    if (nameRef.current!.value.length > 30) {
      setPopupMessage("Name must be less than 30 characters");
      setPopup(true);
      setTimeout(() => {
        setPopup(false);
      }, 2000);
      return;
    }

    //handle no details
    if (detailsRef.current!.value === "") {
      setPopupMessage("Please enter event details");
      setPopup(true);
      setTimeout(() => {
        setPopup(false);
      }, 2000);
      return;
    }

    //handle details too long
    if (detailsRef.current!.value.length > 300) {
      setPopupMessage("Details must be less than 300 characters");
      setPopup(true);
      setTimeout(() => {
        setPopup(false);
      }, 2000);
      return;
    }

    //handle no photo
    if (photoRef.current!.files!.length === 0) {
      setPopupMessage("Please upload a photo");
      setPopup(true);
      setTimeout(() => {
        setPopup(false);
      }, 2000);
      return;
    }



    //handle no start time is equal to end time
    if (startTimeRef.current!.value === endTimeRef.current!.value) {
      setPopupMessage("Start time cannot be equal to end time");
      setPopup(true);
      setTimeout(() => {
        setPopup(false);
      }, 2000);
      return;
    }

    //handle start time after end time
    if (startTimeRef.current!.value > endTimeRef.current!.value) {
      setPopupMessage("Start time cannot be after end time");
      setPopup(true);
      setTimeout(() => {
        setPopup(false);
      }, 2000);
      return;
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



    const form:OnceOfferForm = {
      name: nameRef.current!.value,
      details: detailsRef.current!.value,
      photoURL: secureUrl,
      startDate: startDateRefObj,
      startTime: startTimeRef.current?.value!,
      endTime: endTimeRef.current?.value!,
      isQR: isQR,
      quantity: quantityRefValue,
    }
    startTransition(() => props.submitOnceOfferForm(form))

  }

  return (
    <>
    <form className={styles.form} onSubmit={handleSubmit}>
      <FormLabel title="Offer Name" htmlFor="name" />
      <FormInput
        name="name"
        type="text"
        placeholder="241 Cocktails"
        value={undefined}
        ref={nameRef}
      />

      <FormLabel title="Offer Details" htmlFor="details" />
      <textarea
        className={styles.textarea}
        cols={5}
        placeholder="idk bananas"
        ref={detailsRef}
      />



      <div className={styles.dates}>
        <div className={styles.dateItem}>
          <FormLabel title="Start Date" htmlFor="start date" />
          <DateInput getDate={getStartDate} />
        </div>
      </div>

      <div className={styles.times}>
        <div className={styles.timeItem}>
          <FormLabel title="Start Time" htmlFor="start time" />
          <input type="time" className={styles.timeInput} ref={startTimeRef}/>
        </div>
        <div className={styles.timeItem}>
          <FormLabel title="End Time" htmlFor="end time" />
          <input type="time" className={styles.timeInput} ref={endTimeRef}/>
        </div>
      </div>

      <div className={styles.qrHeader}>
        <SubHeader title="Issues QR Codes?" />
        <AiOutlineInfoCircle />
        <p
          className={yesIsClicked ? styles.activeQR : styles.inactiveQR}
          onClick={handleQRYesClick}
        >
          Yes
        </p>
        <p
          className={noIsClicked ? styles.activeQR : styles.inactiveQR}
          onClick={handleQRNoClick}
        >
          No
        </p>
      </div>

      {yesIsClicked && (
        <>
          <FormLabel title="Number of offers" htmlFor="offer quantity" />
          <Slider
            min={1}
            max={100}
            step={1}
            value={quantityOffers}
            onChange={(event) => setQuantityOffers(Number(event.valueOf()))}
            handleStyle={{
              backgroundColor: "#F87171",
              zIndex: 0,
              borderColor: "#F87171",
              opacity: 1,
            }}
            trackStyle={{ backgroundColor: "#F87171", zIndex: 0 }}
          />
          <p className={styles.distance}>{quantityOffers}</p>
        </>
      )}

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
            onChange={handleFileUpload}
            ref={photoRef}
          />
        </div>
        </div>
      </label>

      <button className={styles.submit} type="submit">SUBMIT</button>
    </form>
    {popup && <ErrorPopup message={popupMessage}/>}
    </>
  );
};

export default OnceForm;
