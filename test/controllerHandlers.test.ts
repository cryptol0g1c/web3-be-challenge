import {
  describe, it, expect, jest,
} from '@jest/globals';
import * as express from 'express';
import GetInfoController from '../src/controllers/getInfoController';
import StoreInfoController from '../src/controllers/storeInfoController';
import { sampleDbDocument } from './sampleTransaction';
import { TransactionDocument } from '../src/models/transactionModel';

jest.setTimeout(50000);

// jest.mock('../src/controllers/getInfoController');
// jest.mock('../src/controllers/storeInfoController');

// StoreInfoController test suite
describe('StoreInfoController', () => {
  it('stores info correctly', async () => {
    const storedDocument = sampleDbDocument as unknown as TransactionDocument;
    StoreInfoController.storeInfo = jest.fn(async () => storedDocument);
    const mockRequest = {} as express.Request;
    const mockResponse = {
      send: jest.fn(),
    } as unknown as express.Response;
    await StoreInfoController.storeInfoHandler(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledWith(storedDocument);
  });
  it('returns an error when storing', async () => {
    const sampleError = new Error('Error');
    StoreInfoController.storeInfo = jest.fn(() => Promise.reject(sampleError));
    const mockRequest = {} as express.Request;
    const mockResponse = {
      send: jest.fn(),
    } as unknown as express.Response;
    await StoreInfoController.storeInfoHandler(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledWith(sampleError);
  });
});

// GetInfoController test suite
describe('product ', () => {
  it('get info correctly', async () => {
    const storedDocument = sampleDbDocument as unknown as TransactionDocument;
    GetInfoController.getLastTransaction = jest.fn(async () => storedDocument);
    const mockRequest = {} as express.Request;
    const mockResponse = {
      send: jest.fn(),
    } as unknown as express.Response;
    await GetInfoController.getTransactionHandler(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledWith(storedDocument);
  });
  it('returns and error when getting info', async () => {
    const sampleError = new Error('Error');
    GetInfoController.getLastTransaction = jest.fn(async () => Promise.reject(sampleError));
    const mockRequest = {} as express.Request;
    const mockResponse = {
      send: jest.fn(),
    } as unknown as express.Response;
    await GetInfoController.getTransactionHandler(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledWith(sampleError);
  });
});
