'use client'

import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { toast } from 'react-toastify'
import Box from '@mui/material/Box'
import { useQuery } from '@apollo/client'
import { Button, Card, CardHeader, Stack, Typography } from '@mui/material'
import { Address, Employee, Organization } from '@/state/types'
// @mui
import IconButton from '@mui/material/IconButton'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
// components
import Iconify from '@/components/iconify'
import moment from 'moment'
import { useBoolean } from '@/hooks/use-boolean'
import AddEmployeeDialog from './AddEmployeeDialog'
import { useEffect, useMemo, useState } from 'react'
import { setOrganization } from '@/state/app'
import { selectOrganization } from '@/state/selectors'
import OrganizationTimeline from './OrganizationTimeLine'
import { EMPLOYEE_ADDS, GET_EMPLOYEES, ORG_ADDED, ORG_FUNDED } from './graph-queries'

import { formatEther } from 'viem'
import { paySalary } from '@/services/write-services'
import { fetchFreelancers } from '@/services/read-services'

// ----------------------------------------------------------------------
const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    width: 120,
  },
  {
    field: 'address',
    headerName: 'Address',
    width: 120,
  },
  {
    field: 'activity',
    headerName: 'Activity',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'salary',
    headerName: 'Salary',
    type: 'number',
    width: 140,
    editable: true,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => ` ${formatEther(params.row.salary)}ETH`,
  },
  {
    field: 'verified',
    headerName: 'Verified',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'daysWorked',
    headerName: 'Days Worked',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'pay-action',
    headerName: ' ',
    width: 60,
    align: 'center',
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <IconButton
        color="primary"
        onClick={async () => {
          try {
            const tx = await paySalary(params.row.address)
            toast.success(`🦄 salary payment transaction submitted! transaction: ${tx}`)
          } catch (error) {
            console.error(error)
            // toast.error(`Payment failed: ${error}`, {
            //   position: 'top-right',
            //   autoClose: 5000,
            //   hideProgressBar: false,
            //   closeOnClick: true,
            //   pauseOnHover: true,
            //   draggable: true,
            //   progress: undefined,
            //   theme: 'light',
            // })
          }
        }}
      >
        <Iconify icon="ic:outline-payment" />
      </IconButton>
    ),
  },
  {
    field: 'delete-action',
    headerName: ' ',
    width: 60,
    align: 'center',
    sortable: false,
    disableColumnMenu: true,
    renderCell: () => (
      <IconButton color="error">
        <Iconify icon="ic:outline-delete-forever" />
      </IconButton>
    ),
  },
]

type DataGridProps = {
  data: Employee[]
}

export function EmployeeDataGrid({ data }: any) {
  console.log('In the employeee grid', data)
  return (
    <DataGrid
      columns={columns}
      rows={data}
      getRowId={(row) => row.address}
      // checkboxSelection
      disableRowSelectionOnClick
    />
  )
}

type Props = {
  address: Address
}

function OrganizationEvents({ address }: Props) {
  return <OrganizationTimeline title="Events" subheader="the history" />
}

export default function OrganizationSection({ address }: Props) {
  const dispatch = useAppDispatch()
  const newEmployeeDialog = useBoolean()
  const org = useAppSelector(selectOrganization)

  const [result, setResult] = useState(null) // State to store the result
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      console.log('fetchData is running')
      try {
        const freelancers = await fetchFreelancers()
        console.log('FREELANCERS in useEffect', freelancers)
        setResult(freelancers) // Update state with fetched data
      } catch (error) {
        console.error('Error fetching freelancers in useEffect:', error)
      } finally {
        setLoading(false) // Set loading to false after fetching is done
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Card>
          <CardHeader
            title="Freelancers"
            sx={{ mb: 2 }}
            action={
              <Button
                variant="contained"
                size="large"
                sx={{ marginLeft: 'auto' }}
                onClick={newEmployeeDialog.onTrue}
              >
                New Freelancer
              </Button>
            }
          />

          <Box sx={{ height: 390 }}>
            <EmployeeDataGrid data={result ?? []} />
          </Box>
        </Card>
        {org && <OrganizationEvents address={address} />}
      </Stack>
      <AddEmployeeDialog dialog={newEmployeeDialog} />
    </>
  )
}
