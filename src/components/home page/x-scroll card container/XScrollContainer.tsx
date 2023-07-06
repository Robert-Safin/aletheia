import { FC } from 'react'
import styles from './XScrollContainer.module.css'

interface Props {
  children :JSX.Element[] | JSX.Element

}

const XScrollContainer:FC<Props> = (props) => {
  return (
    <div className={styles.xContainer}>
      {props.children}
    </div>
  )
}


export default XScrollContainer
