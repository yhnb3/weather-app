import { AngleLeft, Menu, Plus } from 'assets/svgs'
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUnmount } from 'react-use'
import { useRecoilValue } from 'recoil'
import { locationState } from 'states/location'
import styles from './header.module.scss'

interface IProps {
  isAdd: boolean
  inputValue: string
  setInputValue: Dispatch<SetStateAction<string>>
  setSearchValue: Dispatch<SetStateAction<string>>
  setIsAdd: Dispatch<SetStateAction<boolean>>
  setIsEdit: Dispatch<SetStateAction<boolean>>
}

const Header = ({ isAdd, inputValue, setInputValue, setIsAdd, setSearchValue, setIsEdit }: IProps) => {
  const locationData = useRecoilValue(locationState)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  let timeOut: ReturnType<typeof setTimeout>

  const handleBackClick = () => {
    navigate('/')
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value)
  }

  const handlePlusClick = () => {
    setIsAdd(true)
    setIsEdit(false)
    timeOut = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 0)
  }

  const handleEditClick = () => {
    setIsAdd(false)
    setIsEdit(true)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setInputValue('')
    setSearchValue(inputValue)
  }

  useUnmount(() => {
    clearTimeout(timeOut)
  })

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerItem}>
        <button type='button' onClick={handleBackClick} disabled={locationData.length === 0}>
          <AngleLeft className={styles.angleIcon} />
        </button>
        {isAdd ? (
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
        <button type='button' onClick={handleEditClick}>
          <Menu className={styles.editIcon} />
        </button>
      </div>
    </div>
  )
}

export default Header
