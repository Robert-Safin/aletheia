import { FC } from 'react'
import styles from './CardContainer.module.css'
interface Props {
  children : React.ReactNode
}
const CardContainer:FC<Props> = (props) => {
  return (
    <div className={styles.container}>
      {props.children}
    </div>
  )
}

export default CardContainer
