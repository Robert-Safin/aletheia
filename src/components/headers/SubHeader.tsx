import { FC } from "react"
import styles from './header.module.css'


interface Props {
  title: string
}

const SubHeader:FC<Props> = (props) => {
  return (
    <h2 className={styles.subHeader}>{props.title}</h2>
  )
}

export default SubHeader
