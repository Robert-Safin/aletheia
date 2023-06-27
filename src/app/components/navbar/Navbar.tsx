"use client";
import { FC } from "react";
import styles from "./NavBar.module.css";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { LiaMapSolid } from "react-icons/lia";
import useCustomClientSession from "@/app/lib/useCustomClientSession";
import MissingClientSession from "../missingClientSession/MissingClientSession";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar: FC = (props) => {
  const session = useCustomClientSession();
  const router = useRouter();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.icons}>
          <Link href={`/home`}>
            <AiOutlineHome className={styles.icon} />
          </Link>
          <Link href={`/map`}>
            <LiaMapSolid className={styles.icon} />
          </Link>

          {session ? <Link href={`/profile`}>
            <AiOutlineUser className={styles.icon} />
          </Link> : <Link href={`/register`}>
            <AiOutlineUser className={styles.icon} />
          </Link> }

        </div>
      </div>
    </>
  );
};

export default Navbar;
