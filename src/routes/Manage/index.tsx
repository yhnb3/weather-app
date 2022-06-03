import { useState } from 'react'
import EditMode from './EditMode'

import Header from './Header'
import ListMode from './ListMode'
import styles from './manage.module.scss'

const Manage = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className={styles.pageContainer}>
      <header>
        <Header
          isEdit={isEdit}
          inputValue={inputValue}
          setInputValue={setInputValue}
          setIsEdit={setIsEdit}
          setSearchValue={setSearchValue}
        />
      </header>
      <main>{isEdit ? <EditMode searchValue={searchValue} setIsEdit={setIsEdit} /> : <ListMode />}</main>
    </div>
  )
}

export default Manage
