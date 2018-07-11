import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HiNGModule} from '../../../exports/index';
import {ImageCropperDemoComponent} from './image-cropper-demo.component';

@NgModule({
  imports: [CommonModule, FormsModule, HiNGModule],
  exports: [ImageCropperDemoComponent],
  declarations: [ImageCropperDemoComponent],
  providers: [],
  entryComponents: [ImageCropperDemoComponent]
})
export class ImageCropperDemoModule {
}
