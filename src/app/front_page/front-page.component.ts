import { DomoticApiService } from './../domotic_api/domotic-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'front-page',
  template: 'Host : {{hostName}}'
})

export class FrontPageComponent implements OnInit {
  hostName: string;
  constructor(private domoticApiService: DomoticApiService) { }

  getHostName(): void {
    this.domoticApiService.test().then(hostName => this.hostName = hostName);
  }

  ngOnInit() {
    this.getHostName();
  }
}
