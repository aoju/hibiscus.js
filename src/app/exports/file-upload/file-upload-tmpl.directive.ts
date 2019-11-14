import {Component, ChangeDetectionStrategy, ContentChild, TemplateRef} from '@angular/core';
import {TabTitleDirective} from '../tabs';

@Component({
  selector: 'hi-upload-toolbar',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadToolbarTmplComponent {

  @ContentChild(TemplateRef, {static: false}) template: TemplateRef<any>;

}

@Component({
  selector: 'hi-upload-preview',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadPreviewTmplComponent {

  @ContentChild(TemplateRef, {static: false}) template: TemplateRef<any>;

}

@Component({
  selector: 'hi-upload-file',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadFileTmplComponent {

  @ContentChild(TemplateRef, {static: false}) template: TemplateRef<any>;

}
