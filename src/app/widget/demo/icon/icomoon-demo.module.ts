import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IcomoonDemoComponent} from './icomoon-demo.component';

@NgModule({
  imports: [CommonModule],
  exports: [IcomoonDemoComponent],
  declarations: [IcomoonDemoComponent],
  entryComponents: [IcomoonDemoComponent]
})

export class IcomoonDemoModule {
}
