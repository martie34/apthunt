import { CARS_STORAGE_KEY } from 'consts'
import { create } from 'zustand'
import { combine, persist } from 'zustand/middleware'
import { useShallow } from 'zustand/shallow'

export type CarData = {
  key: string
  brand: string
  model: string
  trim: string
  price: number
  link: string
  zeroToSixty: string
  cityMPG: number
  awd: boolean
  heatedSeats: boolean
}

const useCarState = create(
  persist(
    combine(
      { cars: [] as CarData[], gasPrice: 0, commuteDistanceMiles: 0 },
      (set) => ({
        setCars: (cars: CarData[]) => set({ cars }),
        updateCar: (key: string, updatedFields: Partial<CarData>) =>
          set(({ cars }) => {
            const newCars = [...cars]
            const index = newCars.findIndex((car) => car.key === key)
            newCars[index] = { ...newCars[index], ...updatedFields }
            return { cars: newCars }
          }),
        addCar: (car: CarData | CarData[]) =>
          set((state) => {
            if (Array.isArray(car)) {
              return {
                cars: [...state.cars, ...car]
              }
            }
            return {
              cars: [...state.cars, car]
            }
          }),
        deleteCar: (key: string) =>
          set((state) => {
            const newCars = state.cars.filter((car) => car.key !== key)
            return { cars: newCars }
          }),
        setGasPrice: (gasPrice: number | string) =>
          set({ gasPrice: parseInt(gasPrice.toString()) }),
        setCommuteDistanceMiles: (commuteDistanceMiles: number | string) =>
          set({
            commuteDistanceMiles: parseInt(commuteDistanceMiles.toString())
          })
      })
    ),
    { name: CARS_STORAGE_KEY }
  )
)

export const useCars = () => {
  return useCarState(useShallow((state) => state.cars))
}

export const useAddCar = () => {
  const { addCar } = useCarState()
  return addCar
}

export const useUpdateCar = () => {
  const { updateCar } = useCarState()
  return updateCar
}

export const useDeleteCar = () => {
  const { deleteCar } = useCarState()
  return deleteCar
}

export const useGasPrice = () => {
  return useCarState(useShallow((state) => state.gasPrice))
}

export const useCommuteDistanceMiles = () => {
  return useCarState(useShallow((state) => state.commuteDistanceMiles))
}

export const useSetGasPrice = () => {
  const { setGasPrice } = useCarState()
  return setGasPrice
}

export const useSetCommuteDistanceMiles = () => {
  return useCarState(useShallow((state) => state.setCommuteDistanceMiles))
}
