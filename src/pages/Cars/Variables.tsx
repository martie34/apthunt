import EditableText from 'components/TableHelpers/EditableText'
import {
  useCommuteDistanceMiles,
  useGasPrice,
  useSetCommuteDistanceMiles,
  useSetGasPrice
} from 'state/carsState'

export const Variables = () => {
  const gasPrice = useGasPrice()
  const commuteDistance = useCommuteDistanceMiles()

  // setters
  const setGasPrice = useSetGasPrice()
  const setCommuteDistance = useSetCommuteDistanceMiles()

  return (
    <div className="my-4 flex flex-row gap-4 p-4">
      <EditableText
        value={gasPrice}
        onChange={setGasPrice}
        isNumber={true}
        extraProps={{
          addonBefore: 'Gas Price $',
          addonAfter: ' / gallon'
        }}
      />
      <EditableText
        value={commuteDistance}
        isNumber={true}
        onChange={setCommuteDistance}
        extraProps={{
          addonBefore: 'Commute Distance',
          addonAfter: ' miles'
        }}
      />

      <h1>Variables</h1>
    </div>
  )
}
