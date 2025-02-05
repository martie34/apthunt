import { Table } from 'antd'
import {
  BaseRow,
  useAutoAddEmptyRow,
  useTableColumnsHelper
} from 'components/TableHelpers/useTableColumnsHelper'
import { RenderCustomType } from 'consts'
import {
  CarData,
  useAddCar,
  useCars,
  useDeleteCar,
  useUpdateCar
} from 'state/carsState'
import CommuteCost from './CommuteCost'

const EXAMPLE_ROWS: BaseRow<CarData>[] = [
  {
    key: '1',
    dataType: RenderCustomType.TEXT,
    label: 'Brand',
    dataIndex: 'brand',
    sortable: true
  },
  {
    key: '2',
    dataType: RenderCustomType.TEXT,
    label: 'Model',
    dataIndex: 'model',
    sortable: true
  },
  {
    key: '3',
    dataType: RenderCustomType.TEXT,
    label: 'Trim',
    dataIndex: 'trim',
    sortable: true
  },
  {
    key: '4',
    dataType: RenderCustomType.NUMBER,
    label: 'Price',
    dataIndex: 'price',
    sortable: true
  },
  {
    key: '5',
    dataType: RenderCustomType.LINK,
    label: 'Link',
    dataIndex: 'link',
    sortable: false,
    width: '7%'
  },
  {
    key: '6',
    dataType: RenderCustomType.TEXT,
    label: '0-60',
    dataIndex: 'zeroToSixty',
    sortable: true
  },
  // cityMPG
  {
    key: 'cityMPG',
    dataType: RenderCustomType.NUMBER,
    label: 'City MPG',
    dataIndex: 'cityMPG',
    sortable: true
  },
  // calculation based on some things
  {
    key: '7',
    dataType: RenderCustomType.NUMBER,
    label: 'Commute Cost',
    sortable: false,
    width: '10%',
    render: (_, record) => <CommuteCost cityMPG={record.cityMPG} />
  },
  // awd
  {
    key: 'awd',
    dataType: RenderCustomType.CHECKBOX,
    label: 'AWD',
    dataIndex: 'awd',
    sortable: true
  },
  // heatedSeats
  {
    key: 'heatedSeats',
    dataType: RenderCustomType.CHECKBOX,
    label: 'Heated Seats',
    dataIndex: 'heatedSeats',
    sortable: true
  },
  {
    key: '7',
    dataType: RenderCustomType.DELETE,
    label: 'RM',
    sortable: false,
    width: '10px'
  }
]

export const CarsTable = () => {
  const cars = useCars()

  const updateState = useUpdateCar()
  const deleteRow = useDeleteCar()
  const addRow = useAddCar()

  useAutoAddEmptyRow<CarData>(addRow, cars)

  const columns = useTableColumnsHelper<
    CarData,
    BaseRow<CarData, keyof CarData>
  >({
    updateState,
    deleteRow,
    exampleRows: EXAMPLE_ROWS
  })

  return <Table dataSource={cars} columns={columns} pagination={false} />
}
