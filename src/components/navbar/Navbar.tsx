"use client";
import { FC } from "react";
import styles from "./NavBar.module.css";
import { AiOutlineHome} from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { LiaMapSolid } from "react-icons/lia";
import useCustomClientSession from "@/lib/useCustomClientSession";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoBusinessOutline } from "react-icons/io5";

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

          <Link href={`/settings`}>
            <CiSettings className={styles.icon} />
          </Link>



         {session.data?.user?.isVenueOwner && <Link href={`/management`}>
            <IoBusinessOutline className={styles.icon} />
          </Link>}

          <Link href={'/'}>
            <h1 className={styles.icon}>root</h1>
          </Link>


        </div>
      </div>
    </>
  );
};

export default Navbar;
