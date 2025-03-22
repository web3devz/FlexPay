import { useAccount, useReadContract, useBalance } from 'wagmi'
import { baseSepolia } from 'viem/chains'
import payrollAbi from '@/config/payrollAbi'
import { readContracts, readContract } from '@wagmi/core'
import { config } from '@/config'
import { Address, Employee, Organization } from '@/state/types'
import { PAYROLL_CONTRACT_ADDRESS } from '@/config/constants'

// export async function fetchEmployees(employeeAddresses: readonly `0x${string}`[]) {
//   const results = await readContracts(config, {
//     contracts: employeeAddresses.map((employeeAddress) => ({
//       chainId: baseSepolia.id,
//       abi: payrollAbi,
//       functionName: 'getFreelancers',
//       args: [employeeAddress],
//       address: PAYROLL_CONTRACT_ADDRESS,
//     })),
//   })
//   console.log('fetchEmployees', results)

//   return results
//     .filter((result) => result.status === 'success')
//     .map((result) => {
//       const r = result.result as any

//       return {
//         address: r[0],
//         orgAddress: r[1],
//         verified: Boolean(r[3]),
//         salary: Number(r[4]),
//         activity: r[5],
//         daysWorked: Number(r[6]),
//         latestPayReceived: Number(r[7]),
//         openBalance: Number(r[8]),
//       } as Employee
//     })
// }

export async function fetchFreelancers() {
  console.log(PAYROLL_CONTRACT_ADDRESS)
  console.log(baseSepolia.id)
  const result = await readContract(config, {
    chainId: baseSepolia.id,
    abi: payrollAbi,
    functionName: 'getFreelancers',
    args: [],
    address: PAYROLL_CONTRACT_ADDRESS,
  })

  // Assuming result is an array of freelancers
  const freelancers = result.map((freelancer: any) => ({
    address: freelancer.freelancerAddress,
    orgAddress: freelancer.clientAddress,
    salary: Number(freelancer.weeklyWageWei),
    verified: Boolean(freelancer.worldidverified),
    activity: freelancer.activity,
    daysWorked: Number(freelancer.weeksWorked),
  }))

  console.log('freelancers', freelancers)
  return freelancers
}

export async function fetchFreelancer(address: Address) {
  const result = await readContract(config, {
    chainId: baseSepolia.id,
    abi: payrollAbi,
    functionName: 'getFreelancer',
    args: [address],
    address: PAYROLL_CONTRACT_ADDRESS,
  })

  return {
    address: result.freelancerAddress,
    orgAddress: result.clientAddress,
    salary: Number(result.weeklyWageWei),
    verified: Boolean(result.worldidverified),
    activity: result.activity,
    daysWorked: Number(result.weeksWorked),
  }
}

export async function fetchClient(address: Address) {
  const result = await readContract(config, {
    chainId: baseSepolia.id,
    abi: payrollAbi,
    functionName: 'getClient',
    args: [address],
    address: PAYROLL_CONTRACT_ADDRESS,
  })

  return {
    orgAddress: result.clientAddress,
    orgName: result.clientName,
    orgTreasury: Number(result.treasury),
  } as Organization
}
