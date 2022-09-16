import {
  beforeAll, afterEach, afterAll, describe, it, expect, jest,
} from '@jest/globals';
import MongoMemoryServerHandler from './db-handler';
import GetInfoController from '../src/controllers/getInfoController';
import StoreInfoController from '../src/controllers/storeInfoController';
import { sampleTransaction, sampleDbDocument, sampleTransactionAddress } from './sampleTransaction';

jest.mock('../src/library/blockchain', () => ({
  __esModule: true,
  getTransactionInfo: jest.fn(() => Promise.resolve(sampleTransaction)),
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
    await StoreInfoController.storeInfo();
    const storedTransaction = await GetInfoController.getLastTransaction();
    expect(storedTransaction?.hash).toEqual(sampleDbDocument.hash);
    expect(storedTransaction?.from).toEqual(sampleDbDocument.from);
    expect(storedTransaction?.blockNumber).toEqual(sampleDbDocument.blockNumber);
    expect(storedTransaction?.confirmations).toEqual(sampleDbDocument.confirmations);
  });
});

// GetInfoController test suite
describe('product ', () => {
  it('can be instantiated', () => {
    expect(new GetInfoController()).toBeInstanceOf(GetInfoController);
  });
});
