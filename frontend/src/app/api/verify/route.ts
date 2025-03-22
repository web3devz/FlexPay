import { PAYROLL_CONTRACT_ADDRESS } from '@/config/constants'
import { type IVerifyResponse, verifyCloudProof } from '@worldcoin/idkit-core/backend'
import { NextRequest, NextResponse } from 'next/server'
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { baseSepolia } from 'viem/chains'
import payrollAbi from '@/config/payrollAbi'

export const POST = async (req: NextRequest) => {
  const body = await req.json()
  const { proof, signal } = body
  console.log(proof, signal)
  const app_id = 'app_staging_7f8eb32bb1c5a710e6337c4a51338875'
  const action = 'stipend'
  const verifyRes = (await verifyCloudProof(proof, app_id, action, signal)) as IVerifyResponse
  console.log('Verification', verifyRes)
  if (verifyRes.success) {
    // This is where you should perform backend actions if the verification succeeds
    // Such as, setting a user as "verified" in a database
    // Update verified field

    const account = privateKeyToAccount('')

    const client = createWalletClient({
      account,
      chain: baseSepolia,
      transport: http(),
    })

    console.log('Updating verified status')
    await client.writeContract({
      address: PAYROLL_CONTRACT_ADDRESS,
      abi: payrollAbi,
      functionName: 'verifyFreelancer',
      args: [signal],
      account,
    })
    console.log('Status updated!')

    return NextResponse.json(verifyRes)
  } else {
    // This is where you should handle errors from the World ID /verify endpoint.
    // Usually these errors are due to a user having already verified.
    return NextResponse.json(verifyRes)
  }
}
