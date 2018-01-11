import {Component} from '@angular/core';

@Component({
  selector: 'hi-file-upload-demo',
  templateUrl: './file-upload-demo.template.html'
})
export class FileUploadDemoComponent {

  uploadFiles: any[];

  onRemoveDone(files) {
    console.log('files', files);
  }

  uploadFilesChange($event) {
    this.uploadFiles = $event.map(item => item.uploadResponse.path);
  }

}
