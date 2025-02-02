import { DeleteOutlined } from '@ant-design/icons'
import { clsx } from 'clsx'
import {
  booleanSort,
  numberSort,
  RenderCustomType,
  SortType,
  stringSort
} from 'consts'
import { useEffect, useMemo, useState } from 'react'
import EditableCheckbox from './EditableCheckbox'
import EditableLink from './EditableLink'
import EditableText from './EditableText'

export interface BaseRow<T, K extends keyof T = keyof T> {
  key: string
  dataType?: RenderCustomType
  label: string
  dataIndex?: K
  render?: (value: T[K], record: T) => JSX.Element
  sortable: boolean
  sorter?: (a: any, b: any) => number
  width?: string
  className?: string
}

type CreateTableColumnsHelperProps<T, R extends BaseRow<T>> = {
  updateState: (key: string, data: any) => void
  deleteRow: (key: string) => void
  exampleRows: R[]
}

export const useTableColumnsHelper = <
  T extends { key: string },
  R extends BaseRow<T>
>({
  updateState,
  deleteRow,
  exampleRows
}: CreateTableColumnsHelperProps<T, R>) => {
  const handleColumnChange = (
    value: string | number | boolean,
    key: string,
    dataIndex: keyof T
  ) => {
    updateState(key, { [dataIndex]: value })
  }

  const handleDeleteRow = (key: string) => {
    deleteRow(key)
  }

  const renderCell = (value: any, record: T, column: R) => {
    const { dataType, dataIndex } = column
    const cell = dataIndex ? record[dataIndex] : value // Handle optional dataIndex ex: delete icon

    switch (dataType) {
      case RenderCustomType.CHECKBOX:
        return (
          <EditableCheckbox
            value={cell as boolean}
            onChange={(value) =>
              handleColumnChange(value, record['key'], dataIndex as keyof T)
            }
          />
        )
      case RenderCustomType.TEXT:
      case RenderCustomType.NUMBER:
        return (
          <EditableText
            value={cell as string | number}
            isNumber={dataType === RenderCustomType.NUMBER}
            onChange={(value) =>
              handleColumnChange(value, record.key, dataIndex as keyof T)
            }
          />
        )
      case RenderCustomType.LINK:
        return (
          <EditableLink
            value={cell as string}
            onChange={(value) =>
              handleColumnChange(value, record.key, dataIndex as keyof T)
            }
          />
        )
      case RenderCustomType.DELETE:
        return (
          <DeleteOutlined
            onClick={() => handleDeleteRow(record.key)}
            className="text-red-400"
          />
        )
      default:
        return cell
    }
  }

  const getSorterFunc = (dataType: RenderCustomType, sortable: boolean) => {
    const sortType =
      dataType === RenderCustomType.CHECKBOX
        ? SortType.BOOLEAN
        : dataType === RenderCustomType.TEXT
          ? SortType.STRING
          : SortType.NUMBER

    let sorterFunc: ((a: any, b: any) => number) | undefined = undefined

    if (sortType === SortType.NUMBER) sorterFunc = numberSort
    else if (sortType === SortType.STRING) sorterFunc = stringSort
    else if (sortType === SortType.BOOLEAN) sorterFunc = booleanSort

    return sortable ? sorterFunc : undefined
  }

  const returnedColumns = useMemo(() => {
    return exampleRows.map((row) => {
      const {
        dataType,
        label,
        sortable,
        sorter,
        dataIndex,
        render,
        className,
        ...extraProps
      } = row

      return {
        ...extraProps,
        // apply text center if data type is checkbox
        className: clsx(
          className,
          dataType === RenderCustomType.CHECKBOX && 'text-center'
        ),
        key: row.key,
        dataIndex: dataIndex,
        title: label,
        sorter: sorter
          ? (a: any, b: any) => sorter(a, b)
          : dataType
            ? (a: any, b: any) =>
                getSorterFunc(dataType, sortable)?.(
                  a[dataIndex],
                  b[dataIndex]
                ) as any
            : () => 0,
        render: render
          ? render
          : (value: any, record: T) => renderCell(value, record, row)
      }
    })
  }, [exampleRows])

  return returnedColumns
}

export const useAutoAddEmptyRow = <T extends { key: string }>(
  addRow: (newRow: T) => void,
  data: T[]
) => {
  const [needsEmptyRow, setNeedsEmptyRow] = useState(false)

  useEffect(() => {
    const checkForEmptyRow = () => {
      if (data.length === 0) {
        setNeedsEmptyRow(true) // Case 1: Data is empty
        return
      }

      const hasEmptyRow = data.some((dataRow) => {
        const copyDataRow = { ...dataRow, key: '' }
        const values = Object.values(copyDataRow)

        // console.log('log!', { copyDataRow, values })
        return values.every(
          (value: string | number) =>
            value === '' || value === undefined || value === null || value === 0
        )
      })

      setNeedsEmptyRow(!hasEmptyRow) // Case 2: Need a row if NO rows are completely empty
    }

    checkForEmptyRow()
  }, [data])

  useEffect(() => {
    if (needsEmptyRow) {
      const newEmptyData: T = {} as T

      addRow({ ...newEmptyData, key: Date.now() }) // Pass the empty row to the addRow function
      setNeedsEmptyRow(false)
    }
  }, [needsEmptyRow, addRow])

  return
}
