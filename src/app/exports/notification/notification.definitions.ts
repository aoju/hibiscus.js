import { TemplateRef } from '@angular/core';

import { MessageData, MessageDataOptions } from '../message/message.definitions';

export interface NotificationData extends MessageData {
  template?: TemplateRef<{}>;

  type?: 'success' | 'info' | 'warning' | 'error' | 'blank' | string;
  title?: string;
}

export interface NotificationDataOptions extends MessageDataOptions {
  /* tslint:disable-next-line:no-any */
  hiStyle?: any;
  /* tslint:disable-next-line:no-any */
  hiClass?: any;
}

// Filled version of NzMessageData (includes more private properties)
export interface NotificationDataFilled extends NotificationData {
  messageId: string; // Service-wide unique id, auto generated
  state?: 'enter' | 'leave';
  options?: NotificationDataOptions;
  createdAt: Date; // Auto created
}
