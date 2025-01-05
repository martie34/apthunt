import { Table } from 'antd'
import { useApartments } from 'state/apartmentsState'
import { useAddEmptyRow } from './hooks/useAddEmptyRow'
import { useTableColumns } from './hooks/useTableColumns'

const ApartmentTable = () => {
  const apartments = useApartments()

  // useAddFakeData(apartments)
  useAddEmptyRow(apartments)

  const columns = useTableColumns()

  return <Table dataSource={apartments} columns={columns} pagination={false} />
}

export default ApartmentTable
