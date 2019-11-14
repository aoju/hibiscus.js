import {NgModule, ModuleWithProviders, Optional} from '@angular/core';
import {StorageModule} from '../storage/storage.module';
import {OAuth2Service} from './oauth2.service';
import {OAuth2Guard} from './oauth2.guard';
import {OAuth2Config} from './oauth2.config';

export const AUTH_ROLE_PERMISSIONS_PROVIDERS: any[] = [
  OAuth2Service,
  OAuth2Guard
];

export function providePower(config: OAuth2Config): any[] {
  return [
    ...AUTH_ROLE_PERMISSIONS_PROVIDERS,
    {provide: OAuth2Config, useValue: config}
  ];
}

@NgModule({
  imports: [
    StorageModule
  ]
})

export class OAauth2Module {

  static forRoot(config: OAuth2Config): ModuleWithProviders {
    return {
      ngModule: OAauth2Module,
      providers: [
        ...providePower(config)
      ]
    };
  }

  constructor(@Optional()  parentModule: StorageModule) {
    if (!parentModule) {
      throw 'Should import storage(StorageModule)!';
    }
  }

}
