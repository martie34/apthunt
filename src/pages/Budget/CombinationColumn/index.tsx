import { CloseOutlined } from '@ant-design/icons'
import { Flex } from 'antd'
import React, { useCallback } from 'react'
import useBudgetCombination, {
  useSpecificCombination
} from 'state/budgetCombination'
import CombinationInput, { InputType } from './CombinationInput'
import Output from './Output'

type CombinationColumnProps = {
  index: number
}

const CombinationColumn = ({ index }: CombinationColumnProps) => {
  const combination = useSpecificCombination(index)
  const { updateCombination, deleteCombination } = useBudgetCombination()

  const handleDeleteCombination = useCallback(() => {
    deleteCombination(index)
  }, [deleteCombination, index])

  return (
    <Flex vertical gap={'15px'} className="mx-auto min-w-[350px] max-w-[350px]">
      <Flex vertical gap={'10px'} className="mx-5">
        <Flex className="w-full" gap="10px">
          <CombinationInput
            index={index}
            field="label"
            label={combination.label}
            value={combination.label}
            type={InputType.Text}
            updateCombination={updateCombination}
          />
          {index > 0 && (
            <CloseOutlined
              title="Remove Combination"
              onClick={handleDeleteCombination}
              className="text-3xl font-bold text-red-400"
            />
          )}
        </Flex>

        <CombinationInput
          index={index}
          field="rent"
          label="Rent: $"
          value={combination.rent}
          type={InputType.Slider}
          updateCombination={updateCombination}
          extraProps={{
            min: 1000,
            max: 4000,
            step: 100,
            marks: {
              1500: 'cheap',
              2500: 'average',
              3300: 'current'
            }
          }}
        />

        <CombinationInput
          index={index}
          field="carPayment"
          label="Car Payment: $"
          value={combination.carPayment}
          type={InputType.Slider}
          updateCombination={updateCombination}
          extraProps={{
            min: 0,
            max: 1500,
            step: 50,
            marks: {
              0: 'current',
              300: 'average',
              1000: '911 gt3 rs'
            }
          }}
        />

        <CombinationInput
          index={index}
          field="carInsurance"
          label="Car Insurance: $"
          value={combination.carInsurance}
          type={InputType.Slider}
          updateCombination={updateCombination}
          extraProps={{
            min: 0,
            max: 400,
            step: 50,
            marks: {
              0: 'current',
              150: 'cheap',
              300: 'good'
            }
          }}
        />

        {/* Parking fee */}
        <CombinationInput
          index={index}
          field="parkingFee"
          label="Parking Fee: $"
          value={combination.parkingFee}
          type={InputType.Slider}
          updateCombination={updateCombination}
          extraProps={{
            min: 0,
            max: 350,
            step: 50,
            marks: {
              0: 'current',
              200: 'average',
              300: 'slu'
            }
          }}
        />

        {/* Weekly ubers */}
        <CombinationInput
          index={index}
          field="weeklyUbers"
          label="Weekly Ubers: "
          value={combination.weeklyUbers}
          type={InputType.Slider}
          updateCombination={updateCombination}
          extraProps={{
            min: 0,
            max: 10,
            step: 1,
            marks: {
              0: 'walk/bus',
              2: 'current',
              6: 'extro'
            }
          }}
        />

        {/* Weekly paid meals */}
        <CombinationInput
          index={index}
          field="weeklyPaidMeals"
          label="Weekly Paid Meals: "
          value={combination.weeklyPaidMeals}
          type={InputType.Slider}
          updateCombination={updateCombination}
          extraProps={{
            min: 0,
            max: 20,
            step: 1,
            marks: {
              5: 'current',
              8: 'dinner',
              14: 'daily'
            }
          }}
        />
      </Flex>

      <Output combination={combination} />
    </Flex>
  )
}

export default React.memo(CombinationColumn, () => true)
