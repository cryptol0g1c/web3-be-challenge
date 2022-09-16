import App from './app';
import StoreInfoController from './controllers/storeInfoController';
import GetInfoController from './controllers/getInfoController';
import config from './config/config';

const app = new App(
  [
    new StoreInfoController(),
    new GetInfoController(),
  ],
  config.server.port,
);

app.listen();
