import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { MessageConfig } from './message-config';
import { MessageContainerComponent } from './message-container.component';
import { MessageDataFilled, MessageDataOptions } from './message.definitions';

@Component({
  selector           : 'hi-message',
  preserveWhitespaces: false,
  animations         : [
    trigger('enterLeave', [
      state('enter', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('* => enter', [
        style({ opacity: 0, transform: 'translateY(-50%)' }),
        animate('100ms linear')
      ]),
      state('leave', style({ opacity: 0, transform: 'translateY(-50%)' })),
      transition('* => leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate('100ms linear')
      ])
    ])
  ],
  templateUrl         : './message.component.html',
  styleUrls: ['./message.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MessageComponent implements OnInit, OnDestroy {

  @Input() hiMessage: MessageDataFilled;
  @Input() hiIndex: number;

  protected _options: MessageDataOptions; // Shortcut reference to hiMessage.options

  // For auto erasing(destroy) self
  private _autoErase: boolean; // Whether record timeout to auto destroy self
  private _eraseTimer: number = null;
  private _eraseTimingStart: number;
  private _eraseTTL: number; // Time to live

  constructor(private _messageContainer: MessageContainerComponent) {
  }

  ngOnInit(): void {
    this._options = this.hiMessage.options;

    if (this._options.hiAnimate) {
      this.hiMessage.state = 'enter';
    }

    this._autoErase = this._options.hiDuration > 0;

    if (this._autoErase) {
      this._initErase();
      this._startEraseTimeout();
    }
  }

  ngOnDestroy(): void {
    if (this._autoErase) {
      this._clearEraseTimeout();
    }
  }

  onEnter(): void {
    if (this._autoErase && this._options.hiPauseOnHover) {
      this._clearEraseTimeout();
      this._updateTTL();
    }
  }

  onLeave(): void {
    if (this._autoErase && this._options.hiPauseOnHover) {
      this._startEraseTimeout();
    }
  }

  // Remove self
  protected _destroy(): void {
    if (this._options.hiAnimate) {
      this.hiMessage.state = 'leave';
      setTimeout(() => this._messageContainer.removeMessage(this.hiMessage.messageId), 200);
    } else {
      this._messageContainer.removeMessage(this.hiMessage.messageId);
    }
  }

  private _initErase(): void {
    this._eraseTTL = this._options.hiDuration;
    this._eraseTimingStart = Date.now();
  }

  private _updateTTL(): void {
    if (this._autoErase) {
      this._eraseTTL -= Date.now() - this._eraseTimingStart;
    }
  }

  private _startEraseTimeout(): void {
    if (this._eraseTTL > 0) {
      this._clearEraseTimeout(); // To prevent calling _startEraseTimeout() more times to create more timer
      this._eraseTimer = window.setTimeout(() => this._destroy(), this._eraseTTL);
      this._eraseTimingStart = Date.now();
    } else {
      this._destroy();
    }
  }

  private _clearEraseTimeout(): void {
    if (this._eraseTimer !== null) {
      window.clearTimeout(this._eraseTimer);
      this._eraseTimer = null;
    }
  }
}
