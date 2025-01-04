import { Flex, Input } from 'antd'
import { useCallback } from 'react'

type EditableTextProps = {
  value: string | number
  onChange: (value: string | number) => void
}

const EditableText = ({ value, onChange }: EditableTextProps) => {
  // const [editing, setEditing] = useState(!value)

  // console.log('log! adding editbale text', { value, editing })

  // const handleEnableEditing = useCallback(() => {
  //   setEditing(true)
  // }, [])

  // const handleDisableEditing = useCallback(() => {
  //   setEditing(false)
  // }, [])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value)
      // setEditing(false)
    },
    [onChange]
  )

  return (
    <Flex className="w-full justify-between gap-2">
      {/* {!editing && value && (
        <Typography.Paragraph
          className="w-100 inline-block"
          onMouseOver={handleEnableEditing}
        >
          {value}
        </Typography.Paragraph>
      )} */}
      {/* {editing && ( */}
      <Input
        value={value}
        onChange={handleChange}
        // onPressEnter={handleDisableEditing}
        placeholder="Empty"
        className="whitespace-nowrap border-none outline-none"
      />
      {/* )} */}
    </Flex>
  )
}

export default EditableText
