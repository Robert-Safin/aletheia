
import { FC } from "react";
import styles from "./LoadingSession.module.css";
import Container from "../containers/Container";
import { ColorRing } from "react-loader-spinner";

const LoadingSession: FC = () => {
  return (
    <Container>
        <ColorRing wrapperClass={styles.spinner}/>

    </Container>
  );
};

export default LoadingSession;
