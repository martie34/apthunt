import { faker } from '@faker-js/faker'
import { useEffect } from 'react'
import { TableDataType } from './useTableColumns'

const createFakeTableRow = (key: TableDataType['key']): TableDataType => ({
  key,
  personalRating: faker.number.int({ min: 1, max: 5 }),
  name: faker.word.verb(2),
  link: faker.image.avatarGitHub(),
  location: faker.location.city(),
  sqFt: faker.number.int({ min: 500, max: 2000 }),
  initialCost: faker.number.int({ min: 1000, max: 5000 }),
  monthlyPrice: faker.number.int({ min: 1000, max: 5000 }),
  parkingFee: faker.number.int({ min: 0, max: 200 }),
  leaseTermLength: faker.number.int({ min: 6, max: 24 }),
  weeksFreeConcession: faker.number.int({ min: 0, max: 4 }),
  hasAC: faker.datatype.boolean()
})

export const useAddFakeData = (
  data: TableDataType[],
  setData: React.Dispatch<React.SetStateAction<TableDataType[]>>
) => {
  useEffect(() => {
    if (data.length == 0) {
      const fakeData = Array.from({ length: 20 }, (_, i) => {
        console.log('log! creating fake data at index', i + 1)
        return createFakeTableRow(faker.string.uuid())
      })

      console.log('log! adding fake data', fakeData)
      setData(fakeData)
    }
  }, [data.length])
}
