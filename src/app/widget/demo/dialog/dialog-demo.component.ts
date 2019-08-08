import {Component, ChangeDetectionStrategy, ViewEncapsulation, ViewChild, TemplateRef, ViewContainerRef} from '@angular/core';
import {DialogService, HiNGConfig} from '../../../exports';
import {Validators} from '@angular/forms';

@Component({
  selector: 'hi-dialog-demo',
  templateUrl: './dialog-demo.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DialogDemoComponent {

  @ViewChild('selectPromptTemplate', {static: false}) selectPromptTemplate: TemplateRef<any>;

  constructor(private hiNGConfig: HiNGConfig,
              private viewContainerRef: ViewContainerRef,
              private dialogService: DialogService) {
    this.hiNGConfig.rootContainer = this.viewContainerRef;
  }

  alert() {
    this.dialogService.alert({
      title: 'I\'m a hi alert!',
      content: 'This is <strong>hi alert</strong> content.',
      // yes: '确定',
      icon: 'icon-success',
      html: true,
    })
      .subscribe(
        data => console.log('Hi alert get yes result:', data),
        error => console.error('Hi alert get no result:', error)
      );
  }

  confirm() {
    this.dialogService.confirm({
      title: 'I\'m a hi confirm!',
      content: 'This is <strong>hi confirm</strong> content.',
      html: true,
      // icon: 'icon-success',
      // yes: '确定',
      // no: '取消',
      // rootContainer: this.viewContainerRef
    })
      .subscribe(
        data => console.log('Hi confirm get yes result:', data),
        error => console.error('Hi confirm get no result:', error)
      );
  }

  prompt() {
    this.dialogService.prompt({
      title: 'Name',
      content: {
        label: 'Name',
        placeholder: 'Input your name',
        validators: {required: {validator: Validators.required, message: 'Please input your name!'}}
      }
    })
      .subscribe(
        data => console.log('Hi confirm get yes result:', data),
        error => console.error('Hi confirm get no result:', error)
      );
  }

  promptWithTemplate() {
    this.dialogService.prompt({
      title: 'Country',
      content: {
        label: 'Country',
        template: this.selectPromptTemplate,
        validators: {required: {validator: Validators.required, message: 'Please choose your country!'}}
      }
    })
      .subscribe(
        data => console.log('Hi confirm get yes result:', data),
        error => console.error('Hi confirm get no result:', error)
      );
  }
}
