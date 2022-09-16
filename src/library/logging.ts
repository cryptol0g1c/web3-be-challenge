/* eslint-disable no-console */
import { color } from 'console-log-colors';

export default class Logging {
  public static log = (args: any) => this.info(args);

  public static info = (args: any) => console.log(color.blue(`[${new Date().toLocaleString()}] [INFO]`), typeof args === 'string' ? color.blueBright(args) : args);

  public static warning = (args: any) => console.log(color.yellow(`[${new Date().toLocaleString()}] [WARN]`), typeof args === 'string' ? color.yellowBright(args) : args);

  public static error = (args: any) => console.log(color.red(`[${new Date().toLocaleString()}] [ERROR]`), typeof args === 'string' ? color.redBright(args) : args);
}
