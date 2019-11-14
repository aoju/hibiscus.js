import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { SelectFileModel } from './file-upload.model';

@Component({
  selector: 'hi-file-upload-preview',
  templateUrl: './file-upload-preview.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'fileUploadPreview'
})
export class FileUploadPreviewComponent {

  @Input() imgPreview: boolean;
  @Input() previewWidth: string;
  @Input() uploaded: boolean;
  @Input() selectFiles: SelectFileModel[] = [];
  @Output() removeFile = new EventEmitter<SelectFileModel>();

  onRemoveFile(fileItem) {
    this.removeFile.emit(fileItem);
  }
}
