import { FC } from "react";
import styles from "./NavBar.module.css";
import { AiOutlineHome } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { LiaMapSolid } from "react-icons/lia";

import Link from "next/link";
import { IoBusinessOutline } from "react-icons/io5";
import useCustomServerSession from "@/lib/useCustomServerSession";
import { PrismaClient } from "@prisma/client";


const userHasVenues = async (id:number) => {
  const prisma = new PrismaClient();

  const venue = await prisma.venue.findFirst({
    where: {
      ownerId: id,
    },
  });

  await prisma.$disconnect()
  if (venue) {
    return true
  } else {
    return false
  }

}

const Navbar: FC = async () => {



  const session = await useCustomServerSession();
  let isOwner
  if (!session) {
    isOwner = false;
  } else {
    isOwner = await userHasVenues(Number(session.user?.id));
  }




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

          {isOwner && (
              <Link href={`/management`}>
              <IoBusinessOutline className={styles.icon} />
            </Link>
          )}

          <Link href={"/"}>
            <h1 className={styles.icon}>root</h1>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
