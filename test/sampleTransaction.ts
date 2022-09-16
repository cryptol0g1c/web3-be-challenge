export const sampleTransaction = {
  hash: '0x508217c172c3cfe006ee9ca5bef621ba11a359461bacfc0494f1449a7d00f443',
  from: '0xF560749505363a439181E7F462795c92a44f1D7c',
  confirmations: 1771328,
  blockNumber: 18128837,
  blockHash: '0x6b531fc3ea436613624914025bae13afa202fde0fbbc833982c352e5d75667fb',
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
