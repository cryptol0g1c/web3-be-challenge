import App from './app';
import StoreInfoController from './controllers/storeInfoController';
import GetInfoController from './controllers/getInfoController';
import config from './config/config';
import DownloadsController from './controllers/downloadsController';

const app = new App(
  [
    new StoreInfoController(),
    new GetInfoController(),
    new DownloadsController(),
  ],
  config.server.port,
);

app.listen();
