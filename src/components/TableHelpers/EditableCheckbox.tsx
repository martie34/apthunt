import { Checkbox } from 'antd'
import { memo } from 'react'

type EditableCheckboxProps = {
  value: boolean
  onChange: (value: boolean) => void
}

const EditableCheckbox = ({ value, onChange }: EditableCheckboxProps) => {
  return (
    <Checkbox
      checked={value}
      type="checkbox"
      onChange={(e) => onChange(e.target.checked)}
      className="whitespace-nowrap border-none outline-none"
    />
  )
}

export default memo(EditableCheckbox)
