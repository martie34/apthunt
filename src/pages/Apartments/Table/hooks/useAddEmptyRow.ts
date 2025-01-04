import { faker } from '@faker-js/faker'
import { useEffect } from 'react'
import { TableDataType } from '..'

const createEmptyTableRow = (key: TableDataType['key']): TableDataType => ({
  key,
  name: '',
  location: '',
  sqFt: 0,
  monthlyPrice: 0,
  parkingFee: 0,
  link: ''
})

export const useAddEmptyRow = (
  data: TableDataType[],
  setData: React.Dispatch<React.SetStateAction<TableDataType[]>>
) => {
  useEffect(() => {
    // if last data is not empty add an empty row
    if (data.length > 0) {
      const lastData = { ...data[data.length - 1] }
      lastData.key = ''
      const lastDataValues = Object.values(lastData)
      const lastDataIsEmpty = lastDataValues.every((value) => !value)

      if (!lastDataIsEmpty) {
        setData((prevData) => {
          console.log('log! adding empty row at index', prevData)
          return [...prevData, createEmptyTableRow(faker.string.uuid())]
        })
      }
    }
  }, [data[data.length - 1]])
}
