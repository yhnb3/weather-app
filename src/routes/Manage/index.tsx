import { useState } from 'react'

import Header from './Header'
import styles from './manage.module.scss'
import ModeContainer from './ModeContainer'

const Manage = () => {
  const [isAdd, setIsAdd] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className={styles.pageContainer}>
      <header>
        <Header
          isAdd={isAdd}
          inputValue={inputValue}
          setInputValue={setInputValue}
          setIsAdd={setIsAdd}
          setSearchValue={setSearchValue}
          setIsEdit={setIsEdit}
        />
      </header>
      <main>
        <ModeContainer
          isAdd={isAdd}
          isEdit={isEdit}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setIsAdd={setIsAdd}
          setIsEdit={setIsEdit}
        />
      </main>
    </div>
  )
}

export default Manage
