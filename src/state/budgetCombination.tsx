import { COMBINATION_STORAGE_KEY } from 'consts'
import { create } from 'zustand'
import { combine, persist } from 'zustand/middleware'
import { useShallow } from 'zustand/shallow'

export type Combination = {
  label: string
  rent: number
  carPayment: number
  carInsurance: number
  parkingFee: number
  weeklyUbers: number
  weeklyPaidMeals: number
}

const baseCombination: Combination = {
  label: 'Name me!',
  rent: 3300,
  carPayment: 0,
  carInsurance: 0,
  parkingFee: 0,
  weeklyUbers: 2,
  weeklyPaidMeals: 5
}

const useBudgetCombination = create(
  persist(
    combine({ combinations: [baseCombination] }, (set) => ({
      setCombinations: (combinations: Combination[]) => set({ combinations }),
      updateCombination: (index: number, updatedFields: Partial<Combination>) =>
        set(({ combinations }) => {
          const newCombinations = [...combinations]
          newCombinations[index] = {
            ...newCombinations[index],
            ...updatedFields
          }
          return { combinations: newCombinations }
        }),
      addCombination: () =>
        set((state) => {
          return {
            combinations: [...state.combinations, baseCombination]
          }
        }),
      deleteCombination: (index: number) =>
        set((state) => {
          const newCombinations = [...state.combinations]
          newCombinations.splice(index, 1)
          return { combinations: newCombinations }
        })
    })),
    { name: COMBINATION_STORAGE_KEY }
  )
)

export default useBudgetCombination

export const useSpecificCombination = (index: number) => {
  return useBudgetCombination(useShallow((state) => state.combinations[index]))
}

export const useCombinationCount = () => {
  return useBudgetCombination(useShallow((state) => state.combinations.length))
}
