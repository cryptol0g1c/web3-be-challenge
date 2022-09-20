import {
  describe, it, expect, jest,
} from '@jest/globals';
import { ethers } from 'ethers';
import {
  sampleTransaction, sampleTransactionAddress,
  sampleEvents, sampleLog, sampleParsedLog, sampleEvent,
} from './sampleTransaction';
import { getTransactionInfo } from '../src/library/w3Utils';

jest.mock('ethers', () => ({
  ethers: {
    Contract: jest.fn(() => ({
      interface: {
        parseLog: jest.fn(() => (sampleParsedLog)),
      },
    })),
    utils: {
      formatEther: jest.fn()
        .mockReturnValueOnce('0xF560749505363a439181E7F462795c92a44f1D7c')
        .mockReturnValueOnce('0x454E67025631C065d3cFAD6d71E6892f74487a15')
        .mockReturnValueOnce('0.696835197617613041'),
    },
    providers: {
      JsonRpcProvider: jest.fn(() => ({
        getTransaction: jest.fn(async () => sampleTransaction),
        getTransactionReceipt: jest.fn(async () => ({
          logs: [sampleLog],
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
    expect(transactionInfo).toEqual({
      ...sampleTransaction,
      events: [sampleEvent],
    });
  });
});
