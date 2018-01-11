import {Component, ChangeDetectionStrategy, ContentChild, TemplateRef} from '@angular/core';

@Component({
  selector: 'hi-upload-toolbar',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadToolbarTmplComponent {

  @ContentChild(TemplateRef) template: TemplateRef<any>;

}

@Component({
  selector: 'hi-upload-preview',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadPreviewTmplComponent {

  @ContentChild(TemplateRef) template: TemplateRef<any>;

}

@Component({
  selector: 'hi-upload-file',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadFileTmplComponent {

  @ContentChild(TemplateRef) template: TemplateRef<any>;

}
