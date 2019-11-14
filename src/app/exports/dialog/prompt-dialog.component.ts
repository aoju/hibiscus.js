import {Component, EventEmitter, OnInit, TemplateRef, ViewChild, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormGroup, ValidatorFn, FormControl} from '@angular/forms';
import {Modal, ModalDismissReasons} from '../modal';
import {DialogOptions, PromptContent} from './dialog-options.model';
import {HiNGConfig} from '../hi.config';

@Component({
  selector: 'hi-prompt',
  templateUrl: './prompt-dialog.template.html'
})

export class PromptDialogComponent implements Modal, OnInit {

  context: DialogOptions;
  content: PromptContent;
  dismiss: EventEmitter<any>;
  btnYes: string;
  btnNo: string;
  btnYesType: string;
  btnNoType: string;
  form: FormGroup;
  validators: { [key: string]: { validator: ValidatorFn, message: string } };
  @ViewChild('defaultTemplate', {static: false}) defaultTemplate: TemplateRef<any>;

  constructor(private hiNGConfig: HiNGConfig,
              private formBuilder: FormBuilder,
              private changeDetectorRef: ChangeDetectorRef) {
    this.btnYes = hiNGConfig.dialog.button.yes;
    this.btnYesType = hiNGConfig.dialog.button.btnYesType;
    this.btnNo = hiNGConfig.dialog.button.no;
    this.btnNoType = hiNGConfig.dialog.button.btnNoType;
  }

  ngOnInit(): void {
    this.content = this.context.content as PromptContent;
    this.validators = this.content.validators || {};

    const validatorFns = Object.keys(this.validators).map((key) => this.validators[key].validator);
    this.form = this.formBuilder.group({
      promptValue: [this.content.defaultValue || '', validatorFns]
    });
    this.form.valueChanges.subscribe(() => {
      this.changeDetectorRef.markForCheck();
    });
  }

  getFieldErrors(control: FormControl) {
    if (control && control.errors) {
      const errors = Object.keys(control.errors).filter((key) => control.errors[key]);
      return errors.length > 0 ? [errors[0]] : [];
    }
  }

  yes() {
    this.dismiss.emit({...this.form.value, type: ModalDismissReasons.YES});
  }

  no() {
    this.dismiss.error(ModalDismissReasons.NO);
  }
}
