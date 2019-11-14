import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {AlertDialogComponent} from './alert-dialog.component';
import {CommonModule} from '@angular/common';
import {ConfirmDialogComponent} from './confirm-dialog.component';
import {HiCommonModule} from '../common';
import {PromptDialogComponent} from './prompt-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    HiCommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    PromptDialogComponent
  ],
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    PromptDialogComponent
  ]
})
export class DialogModule {
}
