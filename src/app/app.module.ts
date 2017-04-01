import { DomoticApiService } from './domotic_api/domotic-api.service';
import { FrontPageComponent } from './front_page/front-page.component';
import { APP_INITIALIZER } from '@angular/core';
import { AppConfig }       from './app.config';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }      from '@angular/http';

import { AppComponent }  from './app.component';

export function initConfig(config: AppConfig) {
 return () => config.load();
}


@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ AppComponent, FrontPageComponent ],
  bootstrap:    [ AppComponent ],
  providers: [
        AppConfig,
        { provide: APP_INITIALIZER,
          useFactory: initConfig,
          deps: [AppConfig],
          multi: true },
          DomoticApiService
    ],
})
export class AppModule { }
