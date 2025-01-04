import { Card, Typography } from 'antd'
import React, { useMemo } from 'react'
import { Combination } from 'state/budgetCombination'
import useConstantsState from 'state/constantsState'
import formatNumber from 'utils/formatNumber'

const { Paragraph } = Typography

type OutputProps = {
  combination: Combination
}

const getMonthlyCost = (
  combination: Combination,
  mealPrice: number,
  uberPrice: number
) => {
  return (
    combination.rent +
    combination.carPayment +
    combination.carInsurance +
    combination.parkingFee +
    (combination.weeklyPaidMeals * mealPrice * 52) / 12 +
    (combination.weeklyUbers * uberPrice * 52) / 12
  )
}

const Output = ({ combination }: OutputProps) => {
  const { mealPrice, uberPrice } = useConstantsState()

  const monthlyCost = useMemo(
    () => getMonthlyCost(combination, mealPrice, uberPrice),
    [combination, mealPrice, uberPrice]
  )

  return (
    <Card
      className="p-4"
      title={
        <>
          <Paragraph className="text-xl">
            Monthly cost: ${formatNumber(monthlyCost)}
          </Paragraph>
          <Paragraph className="text-xl">
            Yearly cost: ${formatNumber(monthlyCost * 12)}
          </Paragraph>
        </>
      }
    >
      <Paragraph>Rent: ${formatNumber(combination.rent * 12)}</Paragraph>
      <Paragraph>
        Car: $
        {formatNumber(
          (combination.carPayment +
            combination.carInsurance +
            combination.parkingFee) *
            12
        )}
      </Paragraph>
      <Paragraph>
        Uber: ${formatNumber(combination.weeklyUbers * 52 * uberPrice)}
      </Paragraph>
      <Paragraph>
        Food: ${formatNumber(combination.weeklyPaidMeals * mealPrice * 52)}
      </Paragraph>
    </Card>
  )
}

export default React.memo(Output)
