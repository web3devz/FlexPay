const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'clientAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'clientName',
        type: 'string',
      },
    ],
    name: 'ClientAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'clientAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'ClientFunded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'freelancerAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'clientAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'weeklyWageWei',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'activity',
        type: 'string',
      },
    ],
    name: 'FreelancerAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'freelancerAddress',
        type: 'address',
      },
    ],
    name: 'FreelancerVerified',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'freelancerAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'PayoutMade',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'freelancerAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'weeksWorked',
        type: 'uint256',
      },
    ],
    name: 'WeeksWorkedUpdated',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_clientName',
        type: 'string',
      },
    ],
    name: 'addClient',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_freelancerAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_weeklyWageWei',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_activity',
        type: 'string',
      },
    ],
    name: 'addFreelancer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'clients',
    outputs: [
      {
        internalType: 'address',
        name: 'clientAddress',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'clientName',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'treasury',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'freelancerAddresses',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'freelancers',
    outputs: [
      {
        internalType: 'address',
        name: 'freelancerAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'clientAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'weeklyWageWei',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'weeksWorked',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: 'worldidverified',
        type: 'uint8',
      },
      {
        internalType: 'string',
        name: 'activity',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'fundClient',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'clientAddress',
        type: 'address',
      },
    ],
    name: 'getClient',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'clientAddress',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'clientName',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'treasury',
            type: 'uint256',
          },
        ],
        internalType: 'struct SimplePayroll.Client',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'freelancerAddress',
        type: 'address',
      },
    ],
    name: 'getFreelancer',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'freelancerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'clientAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'weeklyWageWei',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'weeksWorked',
            type: 'uint256',
          },
          {
            internalType: 'uint8',
            name: 'worldidverified',
            type: 'uint8',
          },
          {
            internalType: 'string',
            name: 'activity',
            type: 'string',
          },
        ],
        internalType: 'struct SimplePayroll.Freelancer',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getFreelancers',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'freelancerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'clientAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'weeklyWageWei',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'weeksWorked',
            type: 'uint256',
          },
          {
            internalType: 'uint8',
            name: 'worldidverified',
            type: 'uint8',
          },
          {
            internalType: 'string',
            name: 'activity',
            type: 'string',
          },
        ],
        internalType: 'struct SimplePayroll.Freelancer[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_freelancerAddress',
        type: 'address',
      },
    ],
    name: 'payout',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_freelancerAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_weeksWorked',
        type: 'uint256',
      },
    ],
    name: 'updateWeeksWorked',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'freelancerAccount',
        type: 'address',
      },
    ],
    name: 'verifyFreelancer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
] as const

export default abi
