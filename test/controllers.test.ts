import {
  beforeAll, afterEach, afterAll, describe, it, expect, jest,
} from '@jest/globals';
import MongoMemoryServerHandler from './db-handler';
import GetInfoController from '../src/controllers/getInfoController';
import StoreInfoController from '../src/controllers/storeInfoController';
import { 
  sampleTransaction, sampleDbDocument, sampleEvents, sampleTransactionAddress
 } from './sampleTransaction';

jest.mock('../src/library/w3Utils', () => ({
  __esModule: true,
  getTransactionInfo: jest.fn(() => Promise.resolve({
    transaction: sampleTransaction,
    events: sampleEvents,
  })),
}));

const mongoServer = new MongoMemoryServerHandler();

// Connect to a new in-memory database before running any tests
beforeAll(async () => { await mongoServer.start(); });
afterEach(async () => { await MongoMemoryServerHandler.clear(); });
afterAll(async () => { await mongoServer.stop(); });

// StoreInfoController test suite
describe('StoreInfoController', () => {
  it('can be instantiated', () => {
    expect(new StoreInfoController()).toBeInstanceOf(StoreInfoController);
  });
  it('should store transaction', async () => {
    const storedTransaction = await StoreInfoController.storeInfo(sampleTransactionAddress);
    expect(storedTransaction?.hash).toEqual(sampleDbDocument.hash);
    expect(storedTransaction?.from).toEqual(sampleDbDocument.from);
    expect(storedTransaction?.blockNumber).toEqual(sampleDbDocument.blockNumber);
    expect(storedTransaction?.confirmations).toEqual(sampleDbDocument.confirmations);
  });
});

// GetInfoController test suite
describe('product', () => {
  it('can be instantiated', () => {
    expect(new GetInfoController()).toBeInstanceOf(GetInfoController);
  });
});
