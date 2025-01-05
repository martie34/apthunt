import { faker } from '@faker-js/faker'
import { useEffect } from 'react'
import { useAddApartment } from 'state/apartmentsState'
import { TableDataType } from './useTableColumns'

export const createEmptyTableRow = (
  key: TableDataType['key']
): TableDataType => ({
  key,
  personalRating: 0,
  name: '',
  link: '',
  location: '',
  sqFt: 0,
  initialCost: 0,
  monthlyPrice: 0,
  parkingFee: 0,
  leaseTermLength: 0,
  weeksFreeConcession: 0,
  hasAC: false
})

export const useAddEmptyRow = (data: TableDataType[]) => {
  const addApartment = useAddApartment()

  useEffect(() => {
    // if last data is not empty add an empty row
    if (data.length > 0) {
      const lastData = { ...data[data.length - 1] }
      lastData.key = ''
      const lastDataValues = Object.values(lastData)
      const lastDataIsEmpty = lastDataValues.every((value) => !value)

      if (!lastDataIsEmpty) {
        addApartment(createEmptyTableRow(faker.string.uuid()))
      }
    }

    // if no data add an empty row
    if (data.length === 0) {
      addApartment(createEmptyTableRow(faker.string.uuid()))
    }
  }, [addApartment, data])
}
