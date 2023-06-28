import Container from "@/components/containers/Container";
import MainHeader from "@/components/headers/MainHeader";
import SubHeader from "@/components/headers/SubHeader";
import useCustomServerSession from "@/lib/useCustomServerSession";
import { FC } from "react";
import styles from "./page.module.css";
import Link from "next/link";

const SettingsPage: FC = async (props) => {
  return (
    <Container>
      <div className={styles.group}>
        <MainHeader title="Settings" />
        <SubHeader title="Claimed events/offers" />
        <SubHeader title="Change username" />
        <SubHeader title="Change password" />
        <SubHeader title="Change email" />
        <SubHeader title="Event/offer history" />
      </div>

      <div className={styles.group}>
        <MainHeader title="Business" />
        <Link href={`/management/RegisterVenue`}>
        <SubHeader title="Register your venue" />
        </Link>
      </div>
    </Container>
  );
};

export default SettingsPage;
