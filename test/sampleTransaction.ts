export const sampleEvents = [
  {
    name: 'Transfer',
    signature: 'Transfer(address,address,uint256)',
    arguments: [
      '0xF560749505363a439181E7F462795c92a44f1D7c',
      '0x454E67025631C065d3cFAD6d71E6892f74487a15',
      '0.696835197617613041',
    ],
  },
  {
    name: 'Approval',
    signature: 'Approval(address,address,uint256)',
    arguments: [
      '0xF560749505363a439181E7F462795c92a44f1D7c',
      '0x60aE616a2155Ee3d9A68541Ba4544862310933d4',
      '115792089237316195423570985008687907853269984665640564039221.830909129958673233',
    ],
  },
  {
    name: 'Transfer',
    signature: 'Transfer(address,address,uint256)',
    arguments: [
      '0x454E67025631C065d3cFAD6d71E6892f74487a15',
      '0x60aE616a2155Ee3d9A68541Ba4544862310933d4',
      '0.010215738263865727',
    ],
  },
  {
    name: 'Sync',
    signature: 'Sync(uint112,uint112)',
    arguments: [
      '17529720.32563306006771693',
      '257762.354462675332990349',
    ],
  },
  {
    name: 'Swap',
    signature: 'Swap(address,uint256,uint256,uint256,uint256,address)',
    arguments: [
      '0x60aE616a2155Ee3d9A68541Ba4544862310933d4',
      '0.696835197617613041',
      '0.0',
      '0.0',
      '0.010215738263865727',
      '0x60aE616a2155Ee3d9A68541Ba4544862310933d4',
    ],
  },
  {
    name: 'Withdrawal',
    signature: 'Withdrawal(address,uint256)',
    arguments: [
      '0x60aE616a2155Ee3d9A68541Ba4544862310933d4',
      '0.010215738263865727',
    ],
  },
];

export const sampleTransaction = {
  hash: '0x508217c172c3cfe006ee9ca5bef621ba11a359461bacfc0494f1449a7d00f443',
  from: '0xF560749505363a439181E7F462795c92a44f1D7c',
  confirmations: 1771328,
  blockNumber: 18128837,
  blockHash: '0x6b531fc3ea436613624914025bae13afa202fde0fbbc833982c352e5d75667fb',
  events: sampleEvents,
  to: '0x60ae616a2155ee3d9a68541ba4544862310933d4',
};

export const sampleDbDocument = {
  _id: {
    $oid: '632328445d457aa16556de81',
  },
  __v: 0,
  createdAt: '2022-09-15T13:27:32.778Z',
  ...sampleTransaction,
};

export const sampleTransactionAddress = '0x508217c172c3cfe006ee9ca5bef621ba11a359461bacfc0494f1449a7d00f443';

export const sampleEventContracts = [
  { address: '0x6e84a6216ea6dacc71ee8e6b0a5b7322eebc0fdd' },
  { address: '0x6e84a6216ea6dacc71ee8e6b0a5b7322eebc0fdd' },
  { address: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7' },
  { address: '0x454e67025631c065d3cfad6d71e6892f74487a15' },
  { address: '0x454e67025631c065d3cfad6d71e6892f74487a15' },
  { address: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7' },
  { address: '0x6e84a6216ea6dacc71ee8e6b0a5b7322eebc0fdd' },
];

export const sampleLog = {
  transactionIndex: 3,
  blockNumber: 18128837,
  transactionHash: '0x508217c172c3cfe006ee9ca5bef621ba11a359461bacfc0494f1449a7d00f443',
  address: '0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd',
  topics: [
    '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    '0x000000000000000000000000f560749505363a439181e7f462795c92a44f1d7c',
    '0x000000000000000000000000454e67025631c065d3cfad6d71e6892f74487a15'
  ],
  data: '0x00000000000000000000000000000000000000000000000009aba7eb94fca8f1',
  logIndex: 32,
  blockHash: '0x6b531fc3ea436613624914025bae13afa202fde0fbbc833982c352e5d75667fb'
};

export const sampleEvent = {
  name: 'Transfer',
  signature: 'Transfer(address,address,uint256)',
  arguments: [
    '0xF560749505363a439181E7F462795c92a44f1D7c',
    '0x454E67025631C065d3cFAD6d71E6892f74487a15',
    '0.696835197617613041',
  ],
};

export const sampleParsedLog = {
  eventFragment: {
    name: 'Transfer',
    anonymous: false,
  },
  name: 'Transfer',
  signature: 'Transfer(address,address,uint256)',
  topic: '0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1',
  args: [
    { _hex: '0x0e80100b026c7a7b55af42', _isBigNumber: true },
    { _hex: '0x36955342945197a3858d', _isBigNumber: true },
    { _hex: '0x0e80100b026c7a7b55af42', _isBigNumber: true },
  ],
};
