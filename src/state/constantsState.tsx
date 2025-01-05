// zustand store with hooks and ways to update two numbers: Uber Price & meal price
import { CONSTANTS_STORAGE_KEY } from 'consts'
import { create } from 'zustand'
import { combine, persist } from 'zustand/middleware'

const baseConstants = { uberPrice: 40, mealPrice: 40 }

const useConstantsState = create(
  persist(
    combine({ ...baseConstants }, (set) => ({
      updateUberPrice: (price: number) =>
        set((state) => ({ ...state, uberPrice: price })),
      updateMealPrice: (price: number) =>
        set((state) => ({ ...state, mealPrice: price }))
    })),
    { name: CONSTANTS_STORAGE_KEY }
  )
)

export default useConstantsState
