import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getLocation } from 'services/location'
import EditMode from './EditMode'

import Header from './Header'
import ListMode from './ListMode'
import styles from './manage.module.scss'

const Manage = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const { data, isLoading } = useQuery(['locationData', searchValue], () => getLocation(searchValue), {
    refetchOnWindowFocus: false,
    cacheTime: Infinity,
    enabled: !!searchValue.trim(),
    onSuccess: (location) => {
      console.log(location)
    },
  })

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
      <main>{isEdit ? <EditMode /> : <ListMode />}</main>
    </div>
  )
}

export default Manage
