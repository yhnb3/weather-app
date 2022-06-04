import { Dispatch, SetStateAction, useMemo } from 'react'
import { useQuery } from 'react-query'
import { useUnmount } from 'react-use'

import { Error } from 'assets/svgs'
import { getLocation } from 'services/location'
import styles from './addMode.module.scss'
import ResultItem from './ResultItem'

interface IProps {
  searchValue: string
  setSearchValue: Dispatch<SetStateAction<string>>
  setIsAdd: Dispatch<SetStateAction<boolean>>
}
const EditMode = ({ searchValue, setIsAdd, setSearchValue }: IProps) => {
  const { data, isLoading } = useQuery(['locationData', searchValue], () => getLocation(searchValue), {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: Infinity,
    enabled: !!searchValue.trim(),
    suspense: true,
  })
  const searchResult = useMemo(() => {
    if (!data) return null
    if (data.addresses.length === 0)
      return (
        <div className={styles.noResult}>
          <Error className={styles.errorIcon} />
          <p>검색결과가 없습니다.</p>
        </div>
      )
    return (
      <ul>
        {data.addresses.map((result, idx) => {
          const key = `location-result-${idx}`
          return (
            <li key={key}>
              <ResultItem data={result} setIsAdd={setIsAdd} />
            </li>
          )
        })}
      </ul>
    )
  }, [data, setIsAdd])

  useUnmount(() => {
    setSearchValue('')
  })

  if (isLoading) return <p>로딩중...</p>
  return <div className={styles.editModeContainer}>{searchResult}</div>
}

export default EditMode
