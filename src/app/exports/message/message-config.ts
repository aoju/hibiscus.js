import { InjectionToken } from '@angular/core';

export interface MessageConfig {
  // For all messages as default config (can override when dynamically created)
  hiDuration?: number;
  hiPauseOnHover?: boolean;
  hiAnimate?: boolean;
  // For message container only
  hiMaxStack?: number;
  /* tslint:disable-next-line:no-any */
  [index: string]: any;
}

export const MESSAGE_DEFAULT_CONFIG = new InjectionToken<MessageConfig>('MESSAGE_DEFAULT_CONFIG');

export const MESSAGE_CONFIG = new InjectionToken<MessageConfig>('MESSAGE_CONFIG');

export const MESSAGE_DEFAULT_CONFIG_PROVIDER = {
  provide : MESSAGE_DEFAULT_CONFIG,
  useValue: {
    hiDuration    : 3000,
    hiAnimate     : true,
    hiPauseOnHover: true,
    hiMaxStack    : 7
  }
};
