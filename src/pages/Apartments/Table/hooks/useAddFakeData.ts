import { faker } from '@faker-js/faker'
import { useEffect } from 'react'
import { TableDataType } from '..'

const createFakeTableRow = (key: TableDataType['key']): TableDataType => ({
  key,
  name: faker.word.verb(2),
  location: faker.location.city(),
  sqFt: faker.number.int({ min: 500, max: 2000 }),
  monthlyPrice: faker.number.int({ min: 1000, max: 5000 }),
  parkingFee: faker.number.int({ min: 0, max: 200 }),
  link: faker.helpers.arrayElement([
    'https://www.twitch.tv/lacy',
    'https://www.twitch.tv/stableronaldo',
    'https://www.twitch.tv/xqc'
  ])
})

export const useAddFakeData = (
  data: TableDataType[],
  setData: React.Dispatch<React.SetStateAction<TableDataType[]>>
) => {
  useEffect(() => {
    if (data.length == 0) {
      const fakeData = Array.from({ length: 2 }, (_, i) => {
        console.log('log! creating fake data at index', i + 1)
        return createFakeTableRow(faker.string.uuid())
      })

      console.log('log! adding fake data', fakeData)
      setData(fakeData)
    }
  }, [data.length])
}
