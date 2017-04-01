import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AppConfig } from '../app.config';

@Injectable()
export class DomoticApiService {
  constructor(private http: Http, private config: AppConfig) {}
  test(): Promise<string> {
    return Promise.resolve(this.config.getConfig('host'));
  }
  // search(term: string): Observable<Hero[]> {
  //   return this.http
  //              .get(`app/heroes/?name=${term}`)
  //              .map(response => response.json().data as Hero[]);
  // }
}
