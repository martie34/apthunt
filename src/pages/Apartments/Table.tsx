import { Table, Typography } from 'antd'
import {
  BaseRow,
  useAutoAddEmptyRow,
  useTableColumnsHelper
} from 'components/TableHelpers/useTableColumnsHelper'
import { RenderCustomType } from 'consts'
import {
  ApartmentData,
  useAddApartment,
  useApartments,
  useDeleteApartment,
  useUpdateApartment
} from 'state/apartmentsState'
import formatNumber from 'utils/formatNumber'

const COLUMN_TEMPLATE: BaseRow<ApartmentData>[] = [
  {
    key: '1',
    dataType: RenderCustomType.NUMBER,
    label: 'Personal Rating',
    dataIndex: 'personalRating',
    width: '10px',
    sortable: true
  },
  {
    key: '2',
    dataType: RenderCustomType.TEXT,
    label: 'Name',
    dataIndex: 'name',
    sortable: true
  },
  {
    key: '3',
    dataType: RenderCustomType.LINK,
    label: 'Link',
    dataIndex: 'link',
    width: '6%',
    sortable: false
  },
  {
    key: '4',
    dataType: RenderCustomType.TEXT,
    label: 'Location',
    dataIndex: 'location',
    sortable: true
  },
  {
    key: '5',
    dataType: RenderCustomType.NUMBER,
    label: 'Sq Ft',
    dataIndex: 'sqFt',
    width: '7%',
    sortable: true
  },
  {
    key: '6',
    dataType: RenderCustomType.NUMBER,
    label: 'Initial Cost',
    dataIndex: 'initialCost',
    sortable: true,
    width: '7%'
  },
  {
    key: '7',
    dataType: RenderCustomType.NUMBER,
    label: 'Monthly Price',
    dataIndex: 'monthlyPrice',
    sortable: true,
    width: '10px'
  },
  {
    key: '8',
    dataType: RenderCustomType.NUMBER,
    label: 'Parking Fee',
    dataIndex: 'parkingFee',
    sortable: true,
    width: '10px'
  },
  {
    key: '9',
    dataType: RenderCustomType.NUMBER,
    label: 'Lease Term Length',
    dataIndex: 'leaseTermLength',
    sortable: true,
    width: '10px'
  },
  {
    key: '10',
    dataType: RenderCustomType.NUMBER,
    label: 'Weeks Free Concession',
    dataIndex: 'weeksFreeConcession',
    sortable: true,
    width: '10px'
  },
  {
    key: '10',
    label: 'Real Monthly Price',
    width: '10px',
    sortable: true,
    dataType: RenderCustomType.TEXT,
    className: 'text-center font-bold bg-[#1d1d1d]',
    // nit: can move this to state to speed up sort operations
    sorter: (a, b) => {
      const realMonthlyPriceA = calculateMonthlyPrice(
        a.monthlyPrice,
        a.parkingFee,
        a.weeksFreeConcession,
        a.leaseTermLength
      )

      const realMonthlyPriceB = calculateMonthlyPrice(
        b.monthlyPrice,
        b.parkingFee,
        b.weeksFreeConcession,
        b.leaseTermLength
      )

      return realMonthlyPriceA - realMonthlyPriceB
    },
    render: (_, record) => {
      const monthlyPrice = calculateMonthlyPrice(
        record.monthlyPrice,
        record.parkingFee,
        record.weeksFreeConcession,
        record.leaseTermLength
      )

      return (
        <Typography.Title level={4} style={{ margin: 0 }}>
          {isNaN(monthlyPrice) ? '' : formatNumber(monthlyPrice)}
        </Typography.Title>
      )
    }
  },
  {
    key: '11',
    dataType: RenderCustomType.CHECKBOX,
    label: 'AC',
    dataIndex: 'hasAC',
    width: '10px',
    sortable: true
  },
  // contacted
  {
    key: '12',
    dataType: RenderCustomType.CHECKBOX,
    label: 'Contacted',
    dataIndex: 'contacted',
    sortable: true,
    width: '10px'
  },
  {
    label: 'RM',
    key: 'RM',
    dataType: RenderCustomType.DELETE,
    sortable: false,
    width: '10px'
  }
]

const calculateMonthlyPrice = (
  regularLeasePrice: number,
  parkingFee: number,
  weeksFreeConcession: number,
  numberOfMonths: number
) => {
  const totalLeasePrice = regularLeasePrice * numberOfMonths
  const totalParkingFee = parkingFee * numberOfMonths
  const totalConcessionAmount = weeksFreeConcession * (regularLeasePrice / 4)
  const totalCostAfterConcession =
    totalLeasePrice + totalParkingFee - totalConcessionAmount
  const monthlyPrice = totalCostAfterConcession / numberOfMonths

  return monthlyPrice
}

const ApartmentTable = () => {
  const apartments = useApartments()

  const updateState = useUpdateApartment()
  const deleteRow = useDeleteApartment()
  const addRow = useAddApartment()

  useAutoAddEmptyRow<ApartmentData, BaseRow<ApartmentData>>(
    COLUMN_TEMPLATE[0],
    addRow,
    apartments
  )

  const columns = useTableColumnsHelper<ApartmentData, BaseRow<ApartmentData>>({
    updateState,
    deleteRow,
    exampleRows: COLUMN_TEMPLATE
  })

  return <Table dataSource={apartments} columns={columns} pagination={false} />
}

export default ApartmentTable
