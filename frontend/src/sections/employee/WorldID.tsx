import { IDKitWidget, ISuccessResult, VerificationLevel } from '@worldcoin/idkit'
import Iconify from '@/components/iconify'
import { Button } from '@mui/material'
type Props = {
  address: `0x${string}` | undefined
}
export default function VerifyWorldID({ address }: Props) {
  const onSuccess = (result: ISuccessResult) => {
    console.log('success')
  }
  const verifyProof = async (result: ISuccessResult) => {
    //const proof = JSON.stringify(result) // worldID proof
    //console.log(result)
    const response = await fetch('/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        proof: result,
        verification_level: 'device',
        organization: 5,
        signal: address,
      }),
    })
  }

  return (
    <div>
      <IDKitWidget
        app_id="app_staging_7f8eb32bb1c5a710e6337c4a51338875" // obtained from the Developer Portal
        action="stipend" // this is your action name from the Developer Portal
        signal={address} // any arbitrary value the user is committing to, e.g. a vote
        onSuccess={onSuccess}
        handleVerify={verifyProof}
        verification_level={VerificationLevel.Device} // minimum verification level accepted, defaults to "orb"
      >
        {({ open }) => (
          <Button
            style={{ minWidth: '200px', minHeight: '35px' }}
            variant="contained"
            onClick={open}
            color="info"
          >
            <Iconify icon="tabler:world" />
            World ID Verification
          </Button>
        )}
      </IDKitWidget>
    </div>
  )
}
