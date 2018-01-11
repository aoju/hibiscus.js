import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ModalDemoComponent, ModalTestComponent} from './modal-demo.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [ModalDemoComponent],
  declarations: [ModalDemoComponent, ModalTestComponent],
  entryComponents: [ModalTestComponent, ModalDemoComponent]
})
export class ModalDemoModule {
}
