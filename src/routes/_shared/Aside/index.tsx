import { Dispatch, SetStateAction, useRef } from 'react'
import { useClickAway } from 'react-use'
import styles from './aside.module.scss'

interface IProps {
  setIsAside: Dispatch<SetStateAction<boolean>>
}
const Aside = ({ setIsAside }: IProps) => {
  const asideRef = useRef(null)

  useClickAway(asideRef, () => {
    setIsAside(false)
  })

  return (
    <div ref={asideRef} className={styles.asideContainer}>
      aside
    </div>
  )
}

export default Aside
