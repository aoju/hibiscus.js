import {NgModule} from '@angular/core';
import {STORAGE_PROVIDERS} from './storage.service';

@NgModule({
  providers: [
    ...STORAGE_PROVIDERS
  ],
})
export class StorageModule {

}
