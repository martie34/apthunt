import { Table } from 'antd'
import { useState } from 'react'
import { useAddEmptyRow } from './hooks/useAddEmptyRow'
import { useAddFakeData } from './hooks/useAddFakeData'
import { TableDataType, useTableColumns } from './hooks/useTableColumns'

const ApartmentTable = () => {
  const [data, setData] = useState<TableDataType[]>([])

  useAddFakeData(data, setData)
  useAddEmptyRow(data, setData)

  const columns = useTableColumns(setData)

  return <Table dataSource={data} columns={columns} pagination={false} />
}

export default ApartmentTable
