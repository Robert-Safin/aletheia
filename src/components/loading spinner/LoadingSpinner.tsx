
import { FC } from "react";
import styles from './LoadingSpinner.module.css'
import Container from "../containers/Container";
import { ColorRing } from "react-loader-spinner";

const LoadingSpinner: FC = () => {
  return (
    <Container>
        <ColorRing wrapperClass={styles.spinner}/>
    </Container>
  );
};

export default LoadingSpinner;
