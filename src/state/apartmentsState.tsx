import { APARTMENTS_STORAGE_KEY } from 'consts'
import { create } from 'zustand'
import { combine, persist } from 'zustand/middleware'
import { useShallow } from 'zustand/shallow'

export type ApartmentData = {
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
  contacted: boolean
  hasAC: boolean
}

const useApartmentState = create(
  persist(
    combine({ apartments: [] as ApartmentData[] }, (set) => ({
      setApartments: (apartments: ApartmentData[]) => set({ apartments }),
      updateApartment: (key: string, updatedFields: Partial<ApartmentData>) =>
        set(({ apartments }) => {
          const newApartments = [...apartments]
          const index = newApartments.findIndex(
            (apartment) => apartment.key === key
          )
          newApartments[index] = {
            ...newApartments[index],
            ...updatedFields
          }
          return { apartments: newApartments }
        }),
      addApartment: (apartment: ApartmentData | ApartmentData[]) =>
        set((state) => {
          if (Array.isArray(apartment)) {
            return {
              apartments: [...state.apartments, ...apartment]
            }
          }
          return {
            apartments: [...state.apartments, apartment]
          }
        }),
      deleteApartment: (key: string) =>
        set((state) => {
          const newApartments = state.apartments.filter(
            (apartment) => apartment.key !== key
          )
          return { apartments: newApartments }
        })
    })),
    { name: APARTMENTS_STORAGE_KEY }
  )
)

export const useApartments = () => {
  return useApartmentState(useShallow((state) => state.apartments))
}

export const useUpdateApartment = () => {
  const { updateApartment } = useApartmentState()
  return updateApartment
}

export const useAddApartment = () => {
  const { addApartment } = useApartmentState()
  return addApartment
}

export const useDeleteApartment = () => {
  const { deleteApartment } = useApartmentState()
  return deleteApartment
}
