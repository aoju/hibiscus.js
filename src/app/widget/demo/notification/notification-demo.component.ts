import {Component, ChangeDetectionStrategy} from '@angular/core';
import { NotificationService } from  '../../../exports';

@Component({
  selector: 'hi-notification-demo',
  templateUrl: './notification-demo.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationDemoComponent {
  constructor(private notification: NotificationService) {

  }
  createBasicNotification(): void {
    this.notification.blank(
        'Notification Title',
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        // { hiDuration: 0 } // 取消自动关闭只要将该值设为 0 即可。
    );
  }
  createNotification(type: string): void {
    this.notification.create(type, 'Notification Title',
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.');
  }
}
