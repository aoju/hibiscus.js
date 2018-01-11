import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HiNGModule} from '../../../exports';
import {FileUploadDemoComponent} from './file-upload-demo.component';

@NgModule({
  imports: [CommonModule, HiNGModule],
  exports: [FileUploadDemoComponent],
  declarations: [FileUploadDemoComponent],
  providers: [],
  entryComponents: [FileUploadDemoComponent]
})
export class FileUploadDemoModule {
}
