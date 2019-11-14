import {Component, ChangeDetectionStrategy} from '@angular/core';
import { MessageService } from  '../../../exports';

@Component({
  selector: 'hi-message-demo',
  templateUrl: './message-demo.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageDemoComponent {
  constructor(private message: MessageService) {

  }
//   createBasicMessage(): void {
//     this.message.info('This is a normal message', { hiDuration: 10000 });
//   }
  createBasicMessage(): void {
    const id = this.message.loading('Action in progress..', { hiDuration: 0 }).messageId;
    setTimeout(_ => {
      this.message.remove(id);
    }, 2500);
  }
  createMessage(type: string): void {
    this.message.create(type, `This is a message of ${type}`);
  }
}
