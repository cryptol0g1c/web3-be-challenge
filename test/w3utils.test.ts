import {
  describe, it, expect, jest,
} from '@jest/globals';
import { sampleTransaction, sampleTransactionAddress, sampleEventContracts } from './sampleTransaction';
import { getTransactionInfo } from '../src/library/w3Utils';

jest.mock('ethers', () => ({
  ethers: {
    Contract: jest.fn(() => ({
      interface: {
        parseLog: jest.fn(() => ({
          name: 'test',
          signature: 'test',
        })),
      },
    })),
    providers: {
      JsonRpcProvider: jest.fn(() => ({
        getTransaction: jest.fn(async () => sampleTransaction),
        getTransactionReceipt: jest.fn(async () => ({
          logs: sampleEventContracts,
        })),
      })),
    },
  },
}));

describe('W3Utils utils', () => {
  it('Expect to get transaction info', async () => {
    const { transaction, events } = await getTransactionInfo(sampleTransactionAddress);
    const transactionInfo = {
      ...transaction,
      events,
    };
    expect(transactionInfo).toEqual(sampleTransaction);
  });
});
