import { DeleteOutlined } from '@ant-design/icons'
import { FloatButton, Table, TableColumnsType, Typography } from 'antd'
import { useState } from 'react'
import EditableLink from './EditableLink'
import EditableText from './EditableText'
import { useAddEmptyRow } from './hooks/useAddEmptyRow'
import { useAddFakeData } from './hooks/useAddFakeData'

export type TableDataType = {
  key: string
  name: string
  location: string
  sqFt: number
  monthlyPrice: number
  parkingFee: number
  link: string
}

const priceKeys: Partial<keyof TableDataType>[] = ['monthlyPrice', 'parkingFee']

// foramt numbers like 1000 to $1,000
const formatNumber = (num: number) => `$${num.toLocaleString()}`

const ApartmentTable = () => {
  const [data, setData] = useState<TableDataType[]>([])

  useAddFakeData(data, setData)
  useAddEmptyRow(data, setData)

  const handleColumnChange = (
    value: string | number,
    key: TableDataType['key'],
    dataIndex: string
  ) => {
    setData((prevData) => {
      console.log('log! changing record', { value, key, dataIndex, prevData })
      return prevData.map((record) => {
        if (record.key === key) {
          return { ...record, [dataIndex]: value }
        }
        return record
      })
    })
  }

  const handleDeleteRow = (key: TableDataType['key']) => {
    setData((prevData) => {
      return prevData.filter((record) => record.key !== key)
    })
  }

  const renderEditableText = (
    _: any,
    record: TableDataType,
    valueAccess: keyof TableDataType
  ) => {
    console.log('log! skibidi', { record, valueAccess })

    return (
      <EditableText
        value={String(record[valueAccess])}
        onChange={(value) => {
          handleColumnChange(value, record.key, valueAccess)
        }}
      />
    )
  }

  const columns: TableColumnsType<TableDataType> = [
    // { title: 'key', dataIndex: 'key', key: 'key' },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_, record) => renderEditableText(_, record, 'name')
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      sorter: (a, b) => a.link.localeCompare(b.link),
      render: (_, record) => (
        <EditableLink
          value={record.link}
          onChange={(value) => {
            console.log('log!', { value })
            handleColumnChange(value, record.key, 'link')
          }}
        />
      )
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (_, record) => renderEditableText(_, record, 'location')
    },
    {
      title: 'Total Cost',
      key: 'totalCost',
      sorter: (a, b) => {
        const totalCostA = priceKeys.reduce(
          (acc, key) => acc + (a[key] as number),
          0
        )
        const totalCostB = priceKeys.reduce(
          (acc, key) => acc + (b[key] as number),
          0
        )

        return totalCostA - totalCostB
      },
      render: (_, record) => (
        <Typography.Paragraph>
          {formatNumber(
            priceKeys.reduce((acc, key) => acc + (record[key] as number), 0)
          )}
        </Typography.Paragraph>
      )
    },
    {
      title: 'delete',
      key: 'delete',
      render: (_, record) => (
        <FloatButton
          shape="circle"
          onClick={() => handleDeleteRow(record.key)}
          icon={<DeleteOutlined />}
        />
      )
    }
  ]

  return <Table dataSource={data} columns={columns} pagination={false} />
}

export default ApartmentTable
