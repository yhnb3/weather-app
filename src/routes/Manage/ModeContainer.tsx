import { Dispatch, SetStateAction } from 'react'
import EditMode from './EditMode'
import AddMode from './AddMode'
import ListMode from './ListMode'

interface IProps {
  isAdd: boolean
  isEdit: boolean
  searchValue: string
  setIsAdd: Dispatch<SetStateAction<boolean>>
  setIsEdit: Dispatch<SetStateAction<boolean>>
  setSearchValue: Dispatch<SetStateAction<string>>
}

const ModeContainer = ({ isAdd, isEdit, searchValue, setIsAdd, setSearchValue, setIsEdit }: IProps) => {
  if (isAdd) return <AddMode searchValue={searchValue} setIsAdd={setIsAdd} setSearchValue={setSearchValue} />
  if (isEdit) return <EditMode setIsEdit={setIsEdit} />
  return <ListMode />
}

export default ModeContainer
