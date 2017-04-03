import { Room } from './../model/room';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AppConfig } from '../app.config';

@Injectable()
export class DomoticApiService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http, private config: AppConfig) { }

  test(): Promise<string> {
    return Promise.resolve(this.getApiUrl());
  }

  getInformations(): Observable<Room[]> {
    let url = this.getApiUrl() + `/informations`;
    console.log('Appel à l\'url : ' + url);

    return this.http.get(url, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  turnRoomOn(room: string): Observable<string> {
    let url = this.getApiUrl() + `/turn_on/` + room;
    console.log('Appel à l\'url : ' + url);

    return this.http.get(url, this.options)
      .catch(this.handleError);
  }

  turnRoomOff(room: string): Observable<string> {
    let url = this.getApiUrl() + `/turn_off/` + room;
    console.log('Appel à l\'url  : ' + url);

    return this.http.get(url, this.options)
      .catch(this.handleError);
  }


  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  private getApiUrl() {
    return this.config.getConfig('host');
  }

}

