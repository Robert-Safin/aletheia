import { FC } from "react";
import styles from './Container.module.css'

interface Props {
  children: React.ReactNode;
  bgcolor?: string;

}


const Container:FC<Props> = (props) => {
  return (
    <div className={styles.container} style={{backgroundColor: props.bgcolor}}>
        {props.children}
    </div>
  );
}

export default Container
