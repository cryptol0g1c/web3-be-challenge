import { describe, it, expect, jest } from '@jest/globals';
import { sampleTransaction, sampleTransactionAddress } from './sampleTransaction';
import { getTransactionInfo } from '../src/library/blockchain';

jest.mock('ethers', () => ({
  ethers: {
    providers: {
      JsonRpcProvider: jest.fn(() => ({
        getTransaction: jest.fn(async () => sampleTransaction),
      })),
    },
  },
}));

describe('Blockchain utils', () => {
  it('Expect to get transaction info', async () => {
    const transactionInfo = await getTransactionInfo(sampleTransactionAddress);
    expect(transactionInfo).toEqual(sampleTransaction);
  });
});
