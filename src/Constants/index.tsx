import { Slider, Typography } from 'antd'
import useConstantsState from 'state/constantsState'

const { Paragraph } = Typography

const Constants = () => {
  const { uberPrice, updateUberPrice, mealPrice, updateMealPrice } =
    useConstantsState()

  return (
    <>
      <Paragraph>Uber Price: ${uberPrice}</Paragraph>
      <Slider
        value={[uberPrice]}
        onChange={(value) => updateUberPrice(value[0])}
        defaultValue={[40]}
        step={5}
        min={20}
        max={60}
        marks={{
          30: 'wait and save',
          40: 'regular price',
          50: 'rush hour'
        }}
        range
      />

      <Paragraph>Meal Price: ${mealPrice}</Paragraph>
      <Slider
        value={[mealPrice]}
        onChange={(value) => updateMealPrice(value[0])}
        defaultValue={[40]}
        step={5}
        min={5}
        max={50}
        marks={{
          5: 'chef barn',
          15: 'stk steakhouse',
          25: 'chipotle',
          30: 'nordstrom grill',
          40: 'DTF'
        }}
        range
      />
    </>
  )
}

export default Constants
