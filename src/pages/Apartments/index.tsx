import { Typography } from 'antd'
import ApartmentTable from './Table'

const Apartments = () => {
  return (
    <div className="my-4 p-4">
      <Typography.Title level={2}>Lease Ends 3/20</Typography.Title>
      <ApartmentTable />
    </div>
  )
}

export default Apartments
