import { LinkOutlined } from '@ant-design/icons'
import { Flex, Input, Typography } from 'antd'
import { memo } from 'react'

type EditableLinkProps = {
  value: string
  onChange: (value: string) => void
}

const EditableLink = ({ value, onChange }: EditableLinkProps) => {
  return (
    <Flex className="gap-2">
      {value && (
        <Typography.Link href={value} target="_blank">
          <LinkOutlined />
        </Typography.Link>
      )}
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={value || 'Empty'}
        className="whitespace-nowrap border-none outline-none"
      />
    </Flex>
  )
}

export default memo(EditableLink)
