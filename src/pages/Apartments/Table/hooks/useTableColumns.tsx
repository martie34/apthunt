import { DeleteOutlined } from '@ant-design/icons'
import { TableColumnsType, Typography } from 'antd'
import { ColumnGroupType, ColumnType } from 'antd/es/table'
import { useCallback, useMemo } from 'react'
import formatNumber from 'utils/formatNumber'
import EditableCheckbox from '../EditableCheckbox'
import EditableLink from '../EditableLink'
import EditableText from '../EditableText'

export type TableDataType = {
  key: string
  personalRating: number
  name: string
  link: string
  location: string
  sqFt: number
  initialCost: number
  monthlyPrice: number
  parkingFee: number
  leaseTermLength: number
  weeksFreeConcession: number
  hasAC: boolean
}

const calculateMonthlyPrice = (
  regularLeasePrice: number,
  parkingFee: number,
  weeksFreeConcession: number,
  numberOfMonths: number
) => {
  const totalLeasePrice = regularLeasePrice * numberOfMonths
  const totalParkingFee = parkingFee * numberOfMonths
  const totalConcessionAmount = weeksFreeConcession * (regularLeasePrice / 4)
  const totalCostAfterConcession =
    totalLeasePrice + totalParkingFee - totalConcessionAmount
  const monthlyPrice = totalCostAfterConcession / numberOfMonths

  return monthlyPrice
}

enum RenderCustomType {
  TEXT = 'TEXT',
  LINK = 'LINK',
  CHECKBOX = 'CHECKBOX'
}

// number sorter
const numberSort = (a: number, b: number) => a - b

// string sorter
const stringSort = (a: string, b: string) => a.localeCompare(b)

// boolean sorter
const booleanSort = (a: boolean, b: boolean) => (a === b ? 0 : a ? 1 : -1)

enum SortType {
  NUMBER = 'NUMBER',
  STRING = 'STRING',
  BOOLEAN = 'BOOLEAN'
}

export const useTableColumns = (
  setData: React.Dispatch<React.SetStateAction<TableDataType[]>>
) => {
  const handleColumnChange = useCallback(
    (
      value: string | number | boolean,
      key: TableDataType['key'],
      dataIndex: string
    ) => {
      setData((prevData) => {
        return prevData.map((record) => {
          if (record.key === key) {
            return { ...record, [dataIndex]: value }
          }
          return record
        })
      })
    },
    []
  )

  const handleDeleteRow = useCallback((key: TableDataType['key']) => {
    setData((prevData) => {
      return prevData.filter((record) => record.key !== key)
    })
  }, [])

  const renderEditableText = useCallback(
    (
      _: any,
      record: TableDataType,
      valueAccess: keyof Omit<TableDataType, 'hasAC'>
    ) => {
      return (
        <EditableText
          value={record[valueAccess]}
          onChange={(value) => {
            handleColumnChange(value, record.key, valueAccess)
          }}
          isNumber={typeof record[valueAccess] === 'number'}
          hideOnZero={valueAccess !== 'weeksFreeConcession'}
        />
      )
    },
    []
  )

  const generateColumn = useCallback(
    (
      title: string,
      dataIndex: keyof TableDataType,
      sortType?: SortType,
      renderCustomType?: RenderCustomType
    ): ColumnGroupType<TableDataType> | ColumnType<TableDataType> => {
      let sorterFunc: ((a: any, b: any) => number) | undefined = undefined

      if (sortType === SortType.NUMBER) sorterFunc = numberSort
      else if (sortType === SortType.STRING) sorterFunc = stringSort
      else if (sortType === SortType.BOOLEAN) sorterFunc = booleanSort

      return {
        title,
        dataIndex,
        key: dataIndex,
        shouldCellUpdate: (curRecord, prevRecord) =>
          curRecord[dataIndex] !== prevRecord[dataIndex],
        sorter: sorterFunc
          ? (a, b) => sorterFunc?.(a[dataIndex], b[dataIndex]) as any
          : undefined,

        render: (_, record) => {
          switch (renderCustomType) {
            case RenderCustomType.TEXT:
              return renderEditableText(_, record, dataIndex as any)
            case RenderCustomType.LINK:
              return (
                <EditableLink
                  value={record[dataIndex] as string}
                  onChange={(value) => {
                    handleColumnChange(value, record.key, dataIndex)
                  }}
                />
              )
            case RenderCustomType.CHECKBOX:
              return (
                <EditableCheckbox
                  value={record[dataIndex] as boolean}
                  onChange={(value) => {
                    handleColumnChange(value, record.key, dataIndex)
                  }}
                />
              )
            default:
              return record[dataIndex]
          }
        }
      }
    },
    []
  )

  const columns: TableColumnsType<TableDataType> = useMemo(
    () => [
      // { title: 'key', dataIndex: 'key', key: 'key' },
      {
        ...generateColumn(
          'Personal Rating',
          'personalRating',
          SortType.NUMBER,
          RenderCustomType.TEXT
        ),
        defaultSortOrder: 'descend',
        width: '10px'
      },
      {
        ...generateColumn(
          'Name',
          'name',
          SortType.STRING,
          RenderCustomType.TEXT
        )
      },
      {
        ...generateColumn('Link', 'link', undefined, RenderCustomType.LINK)
      },
      {
        ...generateColumn(
          'Location',
          'location',
          SortType.STRING,
          RenderCustomType.TEXT
        )
      },
      {
        ...generateColumn(
          'Sq Ft',
          'sqFt',
          SortType.NUMBER,
          RenderCustomType.TEXT
        ),
        width: '7%'
      },
      {
        ...generateColumn(
          'Initial Cost',
          'initialCost',
          SortType.NUMBER,
          RenderCustomType.TEXT
        ),
        width: '7%'
      },
      {
        ...generateColumn(
          'Monthly Price',
          'monthlyPrice',
          SortType.NUMBER,
          RenderCustomType.TEXT
        ),
        width: '10px'
      },
      {
        ...generateColumn(
          'Parking Fee',
          'parkingFee',
          SortType.NUMBER,
          RenderCustomType.TEXT
        ),
        width: '10px'
      },
      {
        ...generateColumn(
          'Lease Term Length',
          'leaseTermLength',
          SortType.NUMBER,
          RenderCustomType.TEXT
        ),
        width: '10px'
      },
      {
        ...generateColumn(
          'Weeks Free Concession',
          'weeksFreeConcession',
          SortType.NUMBER,
          RenderCustomType.TEXT
        ),
        width: '10px'
      },
      // nit: can move this to state to speed up sort operations
      {
        title: 'Real Monthly Price',
        key: 'realMonthlyPrice',
        width: '10px',
        className: 'text-center font-bold bg-[#1d1d1d]',

        sorter: (a, b) => {
          const realMonthlyPriceA = calculateMonthlyPrice(
            a.monthlyPrice,
            a.parkingFee,
            a.weeksFreeConcession,
            a.leaseTermLength
          )

          const realMonthlyPriceB = calculateMonthlyPrice(
            b.monthlyPrice,
            b.parkingFee,
            b.weeksFreeConcession,
            b.leaseTermLength
          )

          return realMonthlyPriceA - realMonthlyPriceB
        },
        render: (_, record) => {
          const monthlyPrice = calculateMonthlyPrice(
            record.monthlyPrice,
            record.parkingFee,
            record.weeksFreeConcession,
            record.leaseTermLength
          )

          return (
            <Typography.Paragraph>
              {isNaN(monthlyPrice) ? '' : formatNumber(monthlyPrice)}
            </Typography.Paragraph>
          )
        }
      },
      {
        ...generateColumn(
          'AC',
          'hasAC',
          SortType.BOOLEAN,
          RenderCustomType.CHECKBOX
        ),
        width: '10px'
      },
      {
        title: 'RM',
        key: 'RM',
        width: '10px',

        render: (_, record) => (
          <DeleteOutlined
            onClick={() => handleDeleteRow(record.key)}
            className="text-red-400"
          />
        )
      }
    ],
    []
  )

  return columns
}
