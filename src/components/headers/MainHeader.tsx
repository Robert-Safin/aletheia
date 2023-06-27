import { FC } from "react"
import styles from './header.module.css'

interface Props {
  title: string
}

const MainHeader:FC<Props> = (props) => {
  return (
    <h1 className={styles.mainHeader}>{props.title}</h1>
  )
}

export default MainHeader
