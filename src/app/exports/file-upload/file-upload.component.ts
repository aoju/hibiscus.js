import {
  Component,
  ChangeDetectionStrategy,
  Renderer2,
  ChangeDetectorRef,
  Optional
} from '@angular/core';
import {HiNGConfig} from '../hi.config';
import {HttpClient} from '@angular/common/http';
import {FileUpload} from './file-upload';

@Component({
  selector: 'hi-file-upload',
  templateUrl: './file-upload.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'fileUpload'
})
export class FileUploadComponent extends FileUpload {

  constructor(hiNGConfig: HiNGConfig,
              renderer: Renderer2,
              @Optional()  http: HttpClient,
              changeDetectorRef: ChangeDetectorRef) {
    super(hiNGConfig, renderer, http, changeDetectorRef);

  }
}
