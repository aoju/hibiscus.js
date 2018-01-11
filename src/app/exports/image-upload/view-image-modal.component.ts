import {Component, EventEmitter} from '@angular/core';
import {Modal} from '../modal';

@Component({
  selector: 'hi-view-image-modal',
  templateUrl: './view-image-modal.template.html'
})

export class ViewImageModalComponent implements Modal {
  context: any;
  dismiss: EventEmitter<any>;

  close() {
    this.dismiss.next(null);
  }
}
