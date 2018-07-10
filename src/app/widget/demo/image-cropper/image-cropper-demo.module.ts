import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HiNGModule} from '../../../exports';
import {ImageCropperDemoComponent} from './image-cropper-demo.component';

@NgModule({
  imports: [CommonModule, HiNGModule],
  exports: [ImageCropperDemoComponent],
  declarations: [ImageCropperDemoComponent],
  providers: [],
  entryComponents: [ImageCropperDemoComponent]
})
export class ImageCropperDemoModule {
}
