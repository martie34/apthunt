import { Input } from 'antd'
import React, { useMemo } from 'react'
import { CarData, useCommuteDistanceMiles, useGasPrice } from 'state/carsState'

type CommuteCostProps = {
  cityMPG: CarData['cityMPG']
}

const CommuteCost = ({ cityMPG }: CommuteCostProps) => {
  const gasPrice = useGasPrice()
  const commuteDistance = useCommuteDistanceMiles()

  const commuteCost = useMemo(() => {
    return (gasPrice * commuteDistance * 2) / cityMPG
  }, [gasPrice, commuteDistance, cityMPG])

  if (isNaN(commuteCost) || commuteCost === Infinity) return null

  return (
    <Input
      disabled={true}
      value={commuteCost}
      addonBefore="$"
      addonAfter=" / day"
    />
  )
}

export default React.memo(CommuteCost)
