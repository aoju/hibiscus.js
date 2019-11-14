import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Router, NavigationStart, NavigationEnd} from '@angular/router';

import {RoutesModule} from './app.routes';
import {ENV_PROVIDERS} from './app.strategy';
import {APP_RESOLVER_PROVIDERS} from './app.resolver';
import {AppState} from './app.service';
import {AppComponent} from './app.component';

import {SharedModule} from './shared/shared.module';
import {FramesModule} from './frames/frames.module';
import * as NProgress from 'nprogress';

// CSS
import '../assets/styles/scss/all.hidoctor.scss';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

/**
 * `AppModule` is the main entry point into Angular5's bootstraping process
 */
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    FramesModule,
    RoutesModule

  ],
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS
  ],
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ],
})

export class AppModule {

  constructor(public router: Router) {

    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        NProgress.start();
      }

      if (event instanceof NavigationEnd) {
        setTimeout(function () {
          NProgress.done();
        }, 200);
      }
    });

  }

}
