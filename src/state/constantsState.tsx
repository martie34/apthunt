// zustand store with hooks and ways to update two numbers: Uber Price & meal price
import { create } from 'zustand'

type ConstantsState = {
  uberPrice: number
  mealPrice: number
  updateUberPrice: (price: number) => void
  updateMealPrice: (price: number) => void
}

const baseConstants = { uberPrice: 40, mealPrice: 40 }

const getInitialConstants = () => {
  try {
    const savedConstants = JSON.parse(localStorage.getItem('constants') || '{}')
    if (Object.keys(savedConstants).length === 0) {
      localStorage.setItem('constants', JSON.stringify(baseConstants))
      return baseConstants
    }

    return { ...savedConstants }
  } catch (e) {
    console.error('Error loading constants from local storage', e)
    localStorage.removeItem('constants')
    return baseConstants
  }
}

const useConstantsState = create<ConstantsState>((set) => ({
  ...getInitialConstants(),
  updateUberPrice: (price) => set((state) => ({ ...state, uberPrice: price })),
  updateMealPrice: (price) => set((state) => ({ ...state, mealPrice: price }))
}))

export default useConstantsState
