import { Flex, Input, InputProps } from 'antd'
import { memo, useCallback } from 'react'

type EditableTextProps = {
  value: string | number
  onChange: (value: string | number) => void
  isNumber?: boolean
  hideOnZero?: boolean
  extraProps?: InputProps
}

const EditableText = ({
  value,
  onChange,
  isNumber = false,
  hideOnZero = true,
  extraProps
}: EditableTextProps) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(isNumber ? Number(e.target.value) : e.target.value)
    },
    [isNumber, onChange]
  )

  return (
    <Flex className="w-full justify-between gap-2">
      <Input
        value={hideOnZero && value === 0 ? 'Empty' : value}
        onChange={handleChange}
        type={isNumber ? 'number' : 'text'}
        placeholder="Empty"
        className="whitespace-nowrap border-none outline-none"
        {...extraProps}
      />
    </Flex>
  )
}

export default memo(EditableText)
