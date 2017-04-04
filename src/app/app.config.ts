import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AppConfig {

  private config: Object = null;
  private env: Object = null;

  constructor(private http: Http) {

  }

  /**
   * Use to get the data found in the second file (config file)
   */
  public getConfig(key: any) {
    return this.config[key];
  }

  /**
   * Use to get the data found in the first file (env file)
   */
  public getEnv(key: any) {
    return this.env[key];
  }

  /**
   * This method:
   *   a) Loads "env.json" to get the current working environment (e.g.: 'production', 'development')
   *   b) Loads "config.[env].json" to get all env's variables (e.g.: 'config.development.json')
   */
  public load() {
    return new Promise((resolve, reject) => {
      let request: any = null;
      request = this.http.get('./config.json');

      if (request) {
        request
          .map((res: any) => res.json())
          .catch((error: any) => {
            console.error('Error reading configuration file !');
            resolve(error);
            return Observable.throw(error.json().error || 'Server error');
          })
          .subscribe((responseData: any) => {
            this.config = responseData;
            resolve(true);
          });
      } else {
        console.error('Config file "config.json" is not valid');
        resolve(true);
      }
    });
  }
}
