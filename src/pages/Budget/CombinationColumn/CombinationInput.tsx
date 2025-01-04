import { Input, Slider, Typography } from 'antd'
import React from 'react'
import { Combination } from 'state/budgetCombination'
import formatNumber from 'utils/formatNumber'

const { Text } = Typography

export enum InputType {
  Text = 'text',
  Number = 'number',
  Slider = 'slider'
}

type CombinationInputProps = {
  field: keyof Combination
  index: number
  label?: string
  type: InputType
  value: number | string
  // typed extra props for each input type
  extraProps?: {
    min?: number
    max?: number
    step?: number
    marks?: Record<number, string>
  }
  updateCombination: (
    index: number,
    updatedFields: Partial<Combination>
  ) => void
}

const getSliderColorPalette = (field: keyof Combination) => {
  if (field === 'rent') return 'red'
  if (field === 'carPayment') return 'blue'
  if (field === 'carInsurance') return 'green'
  return 'black'
}

const CombinationInput = ({
  field,
  index,
  label,
  type,
  value,
  extraProps,
  updateCombination
}: CombinationInputProps) => {
  if (type === InputType.Text) {
    return (
      <>
        <Input
          className="font-bold"
          onChange={(e) => updateCombination(index, { label: e.target.value })}
          defaultValue={value}
          size="large"
          {...extraProps}
        />
      </>
    )
  }

  if (type === InputType.Number) {
    return (
      <>
        <Text>{`${label}${formatNumber(value)}`}</Text>
        <Input
          onChange={(e) =>
            updateCombination(index, { [field]: +e.target.value })
          }
          defaultValue={label}
          type="number"
          {...extraProps}
        />
      </>
    )
  }

  if (type === InputType.Slider && typeof value === 'number') {
    return (
      <>
        <Text>{`${label}${formatNumber(value)}`}</Text>
        <Slider
          defaultValue={[value]}
          onChange={(value) => updateCombination(index, { [field]: value[0] })}
          range
          {...extraProps}
          tooltip={{ formatter: formatNumber }}
        />
      </>
    )
  }

  console.error('Invalid input type', type, value)

  return null
}

export default React.memo(CombinationInput, (prev, next) => {
  return prev.value === next.value
})
