"use client";
import { FC, useState } from "react";
import styles from "./UpdateVenueButton.module.css";
import { RxCross2 } from "react-icons/rx";
import Modal from "react-modal";
import { BsTrash } from "react-icons/bs";

Modal.setAppElement("#__next");

const UpdateVenueButton: FC = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [deleteIsPressed, setDeleteIsPressed] = useState(false);

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
            <button className={styles.button}>UPDATE VENUE INFORMATION</button>
            <button className={styles.button}>UPDATE MAIN PHOTO</button>
            <button className={styles.button}>UPDATE PHOTOS</button>
            <button className={styles.deleteButton} onClick={handleDeletePress}>
              DELETE VENUE
            </button>
          </div>
        )}

        {deleteIsPressed && (
          <div className={styles.buttonContainer}>
            <h1 className={styles.confirm}>Are you sure? </h1>
            <button className={styles.deleteButton}>DELETE VENUE</button>
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
