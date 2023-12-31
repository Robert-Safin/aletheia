import styles from "./page.module.css";
import { NextPage } from "next";

import useCustomServerSession from "../lib/useCustomServerSession";

import LogInLanding from "@/components/landing page/LogInLanding";
import Container from "@/components/containers/Container";

const HomePage: NextPage = async () => {
  const session = await useCustomServerSession();

  let username;
  if (session) {
    username = session.user!.name;
  } else {
    username = "Guest";
  }

  return (
    <Container bgcolor="#262626">
      <div className={styles.container}>
        <div className={styles.text}>
          <h1 className={styles.title}>Aletheia</h1>
          <p className={styles.goal}>
            Find the best bars near you and enjoy our special deals!
          </p>
        </div>

        <LogInLanding />
      </div>
    </Container>
  );
};

export default HomePage;
