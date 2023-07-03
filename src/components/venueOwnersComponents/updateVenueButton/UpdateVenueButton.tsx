"use client";
import { FC, useState, useTransition } from "react";
import styles from "./UpdateVenueButton.module.css";
import Modal from "react-modal";
import Link from "next/link";

Modal.setAppElement("#__next");

interface Props {
  deleteVenueById: (venueId: number) => void;
  id: number;
}

const UpdateVenueButton: FC<Props> = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [deleteIsPressed, setDeleteIsPressed] = useState(false);

  let [isPending, startTransition] = useTransition();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const handleDeletePress = () => {
    setDeleteIsPressed(true);
  };

  const handleCancelPress = () => {
    setDeleteIsPressed(false);
  };

  return (
    <>
      <button className={styles.updateButton} onClick={openModal}>
        UPDATE VENUE
      </button>

      <Modal
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.9)" } }}
        className={styles.modal}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        {!deleteIsPressed && (
          <div className={styles.buttonContainer}>
            <Link href={`/management/${props.id}/updateVenue`} className={styles.button}>
              UPDATE VENUE INFORMATION
            </Link>
            <Link href={`/management/${props.id}/updatePhoto`} className={styles.button}>
              UPDATE PHOTOS
            </Link>
            <button className={styles.deleteButton} onClick={handleDeletePress}>
              DELETE VENUE
            </button>
          </div>
        )}

        {deleteIsPressed && (
          <div className={styles.buttonContainer}>
            <h1 className={styles.confirm}>Are you sure? </h1>
            <button
              className={styles.deleteButton}
              onClick={() =>
                startTransition(() => props.deleteVenueById(props.id))
              }
            >
              DELETE VENUE
            </button>
            <button className={styles.button} onClick={handleCancelPress}>
              CANCEL
            </button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default UpdateVenueButton;
