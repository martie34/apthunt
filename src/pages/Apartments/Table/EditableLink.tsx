import { LinkOutlined } from '@ant-design/icons'
import { Flex, Input, Typography } from 'antd'
import { useState } from 'react'

type EditableLinkProps = {
  value: string
  onChange: (value: string) => void
}

const EditableLink = ({ value, onChange }: EditableLinkProps) => {
  const [editing, setEditing] = useState(!value)

  return (
    <Flex className="justify-between gap-2">
      {!editing && value && (
        <Typography.Link href={value} target="_blank">
          <LinkOutlined />
        </Typography.Link>
      )}
      {editing && (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onPressEnter={() => setEditing(false)}
          placeholder={value || 'Empty'}
          className="whitespace-nowrap border-none outline-none"
        />
      )}

      {value && (
        <button
          onClick={() => setEditing(!editing)}
          className="text-xs text-purple-500"
        >
          {editing ? 'Save' : 'Edit'}
        </button>
      )}
    </Flex>
  )
}

export default EditableLink
