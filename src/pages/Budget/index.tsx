import Constants from 'Constants'
import { Button, Flex } from 'antd'
import Title from 'antd/es/typography/Title'
import useBudgetCombination, {
  useCombinationCount
} from 'state/budgetCombination'
import CombinationColumn from './CombinationColumn'

const AddCombinationComponent = () => {
  const { addCombination } = useBudgetCombination()

  return (
    <Button onClick={addCombination} variant={'solid'} size="large">
      Add Combination
    </Button>
  )
}

const Budget = () => {
  const combinationCount = useCombinationCount()

  return (
    <div className="my-4 p-4">
      <Title level={2}>Constants</Title>
      <Constants />
      <Title level={2}>Budget Combinations</Title>
      <Flex gap="20px" vertical={false} className="mx-auto overflow-x-auto p-5">
        {combinationCount > 0 &&
          Array.from({ length: combinationCount }).map((_, index) => (
            <CombinationColumn key={index} index={index} />
          ))}
      </Flex>
      <Title level={2}>Settings</Title>
      <Flex gap="20px" className="justify-center">
        <AddCombinationComponent />
      </Flex>
    </div>
  )
}

export default Budget
