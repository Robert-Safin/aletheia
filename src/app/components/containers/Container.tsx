import { FC } from "react";
import styles from './Container.module.css'

interface Props {
  children: React.ReactNode;
}


const Container:FC<Props> = (props) => {
  return (
    <div className={styles.container}>
        {props.children}
    </div>
  );
}

export default Container
