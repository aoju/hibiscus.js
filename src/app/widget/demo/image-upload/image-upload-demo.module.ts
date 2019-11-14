import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HiNGModule} from '../../../exports';
import {ImageUploadDemoComponent} from './image-upload-demo.component';

@NgModule({
  imports: [CommonModule, HiNGModule],
  exports: [ImageUploadDemoComponent],
  declarations: [ImageUploadDemoComponent],
  providers: [],
  entryComponents: [ImageUploadDemoComponent]
})
export class ImageUploadDemoModule {
}
