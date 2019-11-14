import { Component, Inject, Optional } from '@angular/core';

import { MessageConfig, MESSAGE_CONFIG, MESSAGE_DEFAULT_CONFIG } from './message-config';
import { MessageDataFilled, MessageDataOptions } from './message.definitions';

@Component({
  selector           : 'hi-message-container',
  preserveWhitespaces: false,
  templateUrl        : './message-container.component.html'
})
export class MessageContainerComponent {
  messages: MessageDataFilled[] = [];
  config: MessageConfig = {};

  constructor(@Optional() @Inject(MESSAGE_DEFAULT_CONFIG) defaultConfig: MessageConfig,
              @Optional() @Inject(MESSAGE_CONFIG) config: MessageConfig) {
    this.setConfig({ ...defaultConfig, ...config });
  }

  setConfig(config: MessageConfig): void {
    this.config = { ...this.config, ...config };
  }

  // Create a new message
  createMessage(message: MessageDataFilled): void {
    if (this.messages.length >= this.config.hiMaxStack) {
      this.messages.splice(0, 1);
    }
    message.options = this._mergeMessageOptions(message.options);
    this.messages.push(message);
  }

  // Remove a message by messageId
  removeMessage(messageId: string): void {
    this.messages.some((message, index) => {
      if (message.messageId === messageId) {
        this.messages.splice(index, 1);
        return true;
      }
    });
  }

  // Remove all messages
  removeMessageAll(): void {
    this.messages = [];
  }

  // Merge default options and cutom message options
  protected _mergeMessageOptions(options: MessageDataOptions): MessageDataOptions {
    const defaultOptions: MessageDataOptions = {
      hiDuration    : this.config.hiDuration,
      hiAnimate     : this.config.hiAnimate,
      hiPauseOnHover: this.config.hiPauseOnHover
    };
    return { ...defaultOptions, ...options };
  }
}
