import { Dispatch, SetStateAction, useMemo } from 'react'
import { useQuery } from 'react-query'
import { useUnmount } from 'react-use'

import { ErrorIcon } from 'assets/svgs'
import { getLocation } from 'services/location'
import styles from './addMode.module.scss'
import ResultItem from './ResultItem'
import { locationState } from 'states/location'
import { useRecoilValue } from 'recoil'
import Loading from './Loading'

interface IProps {
  searchValue: string
  setSearchValue: Dispatch<SetStateAction<string>>
  setIsAdd: Dispatch<SetStateAction<boolean>>
}
const AddMode = ({ searchValue, setIsAdd, setSearchValue }: IProps) => {
  const locationData = useRecoilValue(locationState)
  const { data, isLoading } = useQuery(['locationData', searchValue], () => getLocation(searchValue), {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: Infinity,
    enabled: !!searchValue.trim(),
  })
  const searchResult = useMemo(() => {
    if (!data) return null

    const filteredData = data.addresses.filter((item) => {
      const targetIdx = locationData.findIndex((location) => location.lon === Number(item.x))
      return targetIdx === -1 || locationData[targetIdx].lat !== Number(item.y)
    })
    if (filteredData.length === 0)
      return (
        <div className={styles.noResult}>
          <ErrorIcon className={styles.errorIcon} />
          <p>검색결과가 없습니다.</p>
        </div>
      )
    return (
      <ul>
        {filteredData.map((result, idx) => {
          const key = `location-result-${idx}`
          return (
            <li key={key}>
              <ResultItem data={result} setIsAdd={setIsAdd} />
            </li>
          )
        })}
      </ul>
    )
  }, [data, locationData, setIsAdd])

  useUnmount(() => {
    setSearchValue('')
  })

  if (isLoading) return <Loading />
  return <div className={styles.editModeContainer}>{searchResult}</div>
}

export default AddMode
