import express, { Router } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import helmet from 'helmet';
import config from './config/config';
import Logging from './library/logging';

class App {
  public app: express.Application;

  public port: number;

  public dbUrl: string;

  constructor(controllers: any[], port: number) {
    this.app = express();
    this.port = port;
    this.dbUrl = config.mongo.url;
    this.app.use(helmet());

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private async connectToTheDatabase() {
    try {
      Logging.log('Connecting to the database...');
      Logging.log(this.dbUrl);
      await mongoose.connect(this.dbUrl);
      Logging.log('Connected to the database');
    } catch (error) {
      Logging.error('Error connecting to the database');
    }
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers: any[]) {
    controllers.forEach((controller:
      { router: Router }) => {
      this.app.use('/', controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      Logging.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
