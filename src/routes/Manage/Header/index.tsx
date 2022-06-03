import { AngleLeft, Plus } from 'assets/svgs'
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUnmount } from 'react-use'
import styles from './header.module.scss'

interface IProps {
  isEdit: boolean
  inputValue: string
  setInputValue: Dispatch<SetStateAction<string>>
  setSearchValue: Dispatch<SetStateAction<string>>
  setIsEdit: Dispatch<SetStateAction<boolean>>
}

const Header = ({ isEdit, inputValue, setInputValue, setIsEdit, setSearchValue }: IProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  let timeOut: ReturnType<typeof setTimeout>

  const handleBackClick = () => {
    navigate(-1)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value)
  }

  const handlePlusClick = () => {
    setIsEdit(true)
    timeOut = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 0)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setSearchValue(inputValue)
  }

  useUnmount(() => {
    clearTimeout(timeOut)
  })

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerItem}>
        <button type='button' onClick={handleBackClick}>
          <AngleLeft className={styles.angleIcon} />
        </button>
        {isEdit ? (
          <form onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type='text'
              className={styles.input}
              value={inputValue}
              onChange={handleInputChange}
            />
          </form>
        ) : (
          <div className={styles.title}>지역 관리</div>
        )}
      </div>
      <div className={styles.headerItem}>
        <button type='button' onClick={handlePlusClick}>
          <Plus className={styles.plusIcon} />
        </button>
      </div>
    </div>
  )
}

export default Header
