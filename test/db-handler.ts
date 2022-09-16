import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

export default class MongoMemoryServerHandler {
  server: any;

  public async start() {
    this.server = await MongoMemoryServer.create();
    const url = await this.server.getUri();
    await mongoose.connect(url);
  }

  public static async clear() {
    await mongoose.connection.db.dropDatabase();
  }

  public async stop() {
    await mongoose.disconnect();
    await this.server.stop();
  }
}
