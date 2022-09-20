import {
  describe, it, expect, jest,
} from '@jest/globals';
import * as express from 'express';
import GetInfoController from '../src/controllers/getInfoController';
import StoreInfoController from '../src/controllers/storeInfoController';
import { sampleDbDocument, sampleTransactionAddress } from './sampleTransaction';
import { TransactionDocument } from '../src/models/transactionModel';

jest.setTimeout(50000);

const mockResponse = {
  send: jest.fn(),
} as unknown as express.Response;

const mockNext = jest.fn() as express.NextFunction;

describe('StoreInfoController test suite', () => {
  it('stores info correctly', async () => {
    const mockRequest = {
      body: {
        tx: sampleTransactionAddress,
      },
    } as unknown as express.Request;
    const storedDocument = sampleDbDocument as unknown as TransactionDocument;
    StoreInfoController.storeInfo = jest.fn(async () => storedDocument);
    await StoreInfoController.storeInfoHandler(mockRequest, mockResponse, mockNext);
    expect(mockResponse.send).toHaveBeenCalledWith(storedDocument);
  });
});

describe('GetInfoController test suite ', () => {
  it('get info correctly', async () => {
    const mockRequest = {} as unknown as express.Request;
    const storedDocument = sampleDbDocument as unknown as TransactionDocument;
    GetInfoController.getLastTransaction = jest.fn(async () => storedDocument);
    await GetInfoController.getTransactionHandler(mockRequest, mockResponse, mockNext);
    expect(mockResponse.send).toHaveBeenCalledWith(storedDocument);
  });
});
