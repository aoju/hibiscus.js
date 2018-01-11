import {
  Component, ChangeDetectionStrategy, Optional, ChangeDetectorRef, Renderer2, Input
} from '@angular/core';
import {FileUpload} from '../file-upload/file-upload';
import {HiNGConfig} from '../hi.config';
import {HttpClient} from '@angular/common/http';
import {ModalService} from '../modal';
import {SelectFileModel} from '../file-upload/file-upload.model';
import {noop} from '../utils';
import {ViewImageModalComponent} from './view-image-modal.component';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'hi-image-upload',
  templateUrl: './image-upload.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'imageUpload'
})
export class ImageUploadComponent extends FileUpload {

  @Input() viewIcon: string;

  constructor(hiNGConfig: HiNGConfig,
              renderer: Renderer2,
              @Optional()  http: HttpClient,
              changeDetectorRef: ChangeDetectorRef,
              private modalService: ModalService) {
    super(hiNGConfig, renderer, http, changeDetectorRef);
    this.viewIcon = this.hiNGConfig.imageUpload.viewIcon;
    this.imgPreview = true;
    this.autoUpload = true;
    this.accept = 'image/*';
  }

  viewImage(fileItem: SelectFileModel) {
    this.modalService.open({
      component: ViewImageModalComponent,
      resolve: {url: fileItem.dataUrl, name: fileItem.name}
    }).subscribe(noop, noop);
  }

  uploadBtnIcon() {
    return this.isUploading ? this.loadingIcon : this.plusIcon;
  }

  protected onFileUploadError(fileItem, error): Observable<any> {
    this.selectFiles = this.selectFiles.filter(item => item !== fileItem);
    return super.onFileUploadError(fileItem, error);
  }

}
