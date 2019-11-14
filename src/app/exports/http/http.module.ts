import {NgModule} from '@angular/core';
import {HTTP_PROVIDERS, HttpInterceptors} from './http.service';
import {HTTP_INTERCEPTORS, HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  providers: [
    ...HTTP_PROVIDERS,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptors,
      multi: true,
    }
  ],
})
export class HttpModule {
}
