import { Button } from 'antd'
import { COMBINATION_STORAGE_KEY, CONSTANTS_STORAGE_KEY } from 'consts'
import React, { useEffect } from 'react'
import useBudgetCombination from 'state/budgetCombination'
import useConstantsState from 'state/constantsState'

const deleteStorage = () => {
  localStorage.clear()
  window.location.reload()
}

const Storage = () => {
  const { combinations } = useBudgetCombination()
  const { mealPrice, uberPrice } = useConstantsState()

  useEffect(() => {
    console.log('log! updating combinations storage')
    localStorage.setItem(COMBINATION_STORAGE_KEY, JSON.stringify(combinations))
  }, [combinations])

  useEffect(() => {
    console.log('log! updating constants state')
    localStorage.setItem(
      CONSTANTS_STORAGE_KEY,
      JSON.stringify({ mealPrice, uberPrice })
    )
  }, [mealPrice, uberPrice])

  return (
    <div>
      <Button onClick={deleteStorage} size="large">
        Delete Storage
      </Button>
    </div>
  )
}

export default React.memo(Storage)
