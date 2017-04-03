import { Room } from './../model/room';
import { DomoticApiService } from './../domotic_api/domotic-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'front-page',
  template: `Host : {{hostName}}
  <br>
  <div *ngFor="let room of rooms">
  <button (click)="turnRoomOn(room.name);">Allumer le/la {{room.name}}</button>
  <button (click)="turnRoomOff(room.name);">Eteindre le/la {{room.name}}</button>
  </div>`
})

export class FrontPageComponent implements OnInit {
  hostName: string;
  name: string;
  rooms: Room[];
  constructor(private domoticApiService: DomoticApiService) { }

  getHostName(): void {
    this.domoticApiService.test().then(hostName => this.hostName = hostName);
  }

  turnRoomOn(room: string): void {
    this.domoticApiService.turnRoomOn(room).subscribe();
  }

  turnRoomOff(room: string): void {
    this.domoticApiService.turnRoomOff(room).subscribe();
  }

  getInformations(): void {
    this.domoticApiService.getInformations().subscribe(data => this.rooms = data);
  }


  ngOnInit() {
    this.getHostName();
    this.name = 'Salon';
    this.getInformations();
  }
}
