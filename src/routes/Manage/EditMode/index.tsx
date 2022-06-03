import { Dispatch, SetStateAction, useMemo } from 'react'
import { useQuery } from 'react-query'
import { getLocation } from 'services/location'
import styles from './editMode.module.scss'
import ResultItem from './ResultItem'

interface IProps {
  searchValue: string
  setIsEdit: Dispatch<SetStateAction<boolean>>
}
const EditMode = ({ searchValue, setIsEdit }: IProps) => {
  const { data, isLoading } = useQuery(['locationData', searchValue], () => getLocation(searchValue), {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: Infinity,
    enabled: !!searchValue.trim(),
    suspense: false,
  })
  const searchResult = useMemo(() => {
    if (!data) return null
    if (data.addresses.length === 0) return <p>검색결과가 없습니다.</p>
    return (
      <ul>
        {data.addresses.map((result, idx) => {
          const key = `location-result-${idx}`
          return (
            <li key={key}>
              <ResultItem data={result} setIsEdit={setIsEdit} />
            </li>
          )
        })}
      </ul>
    )
  }, [data, setIsEdit])

  if (isLoading) return <p>로딩중...</p>
  return <div className={styles.editModeContainer}>{searchResult}</div>
}

export default EditMode
