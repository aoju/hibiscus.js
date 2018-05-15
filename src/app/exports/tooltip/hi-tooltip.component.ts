import {
  AnimationEvent
} from '@angular/animations';
import {
  ConnectedOverlayDirective,
  ConnectedOverlayPositionChange,
  ConnectionPositionPair,
  OverlayOrigin
} from '@angular/cdk/overlay';
import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { fadeAnimation } from '../common/animation/fade-animations';
import { DEFAULT_4_POSITIONS, POSITION_MAP } from '../common/overlay/overlay-position-map';
import { toBoolean } from '../common/util/convert';

@Component({
  selector: 'hi-tooltip',
  preserveWhitespaces: false,
  animations: [ fadeAnimation ],
  templateUrl: './hi-tooltip.component.html',
  styles: [ `
    .hi-tooltip { position: relative; }
  ` ]
})
export class ToolTipComponent {
  _hasBackdrop = false;

  @Input() hiTitle: string;
  @Input() hiContent;

  @Input() hiOverlayClassName = '';
  @Input() hiOverlayStyle = {};
  @Input() hiMouseEnterDelay = 0.15; // Unit: second
  @Input() hiMouseLeaveDelay = 0.1; // Unit: second
  @Output() hiVisibleChange: EventEmitter<boolean> = new EventEmitter();
  @ContentChild('hiTemplate') hiTemplate: TemplateRef<void>;
  @ViewChild('overlay') overlay: ConnectedOverlayDirective;

  overlayOrigin: OverlayOrigin;

  @Input()
  set hiVisible(value: boolean) {
    const visible = toBoolean(value);
    if (this.visibleSource.value !== visible) {
      this.visibleSource.next(visible);
      this.hiVisibleChange.emit(visible);
    }
  }

  get hiVisible(): boolean {
    return this.visibleSource.value;
  }

  visibleSource = new BehaviorSubject<boolean>(false);
  visible$: Observable<boolean> = this.visibleSource.asObservable();

  @Input()
  set hiTrigger(value: string) {
    this._trigger = value;
    this._hasBackdrop = this._trigger === 'click';
  }

  get hiTrigger(): string {
    return this._trigger;
  }

  _prefix = 'hi-tooltip-placement';
  _positions: ConnectionPositionPair[] = [ ...DEFAULT_4_POSITIONS ];
  _classMap = {};
  _placement = 'top';
  _trigger = 'hover';

  @Input()
  set hiPlacement(value: string) {
    if (value !== this._placement) {
      this._placement = value;
      this._positions.unshift(POSITION_MAP[ this.hiPlacement ] as ConnectionPositionPair);
    }
  }

  get hiPlacement(): string {
    return this._placement;
  }

  // Manually force updating current overlay's position
  updatePosition(): void {
    if (this.overlay && this.overlay.overlayRef) {
      this.overlay.overlayRef.updatePosition();
    }
  }

  onPositionChange($event: ConnectedOverlayPositionChange): void {
    for (const key in POSITION_MAP) {
      if (JSON.stringify($event.connectionPair) === JSON.stringify(POSITION_MAP[ key ])) {
        this.hiPlacement = key;
        break;
      }
    }
    this.setClassMap();
    /** TODO may cause performance problem */
    this._cdr.detectChanges();
  }

  show(): void {
    if (!this.isContentEmpty()) {
      this.hiVisible = true;
    }
  }

  hide(): void {
    this.hiVisible = false;
  }

  _afterVisibilityAnimation(e: AnimationEvent): void {
    if (e.toState === 'false' && !this.hiVisible) {
      this.hiVisibleChange.emit(false);
    }
    if (e.toState === 'true' && this.hiVisible) {
      this.hiVisibleChange.emit(true);
    }
  }

  setClassMap(): void {
    this._classMap = {
      [ this.hiOverlayClassName ]             : true,
      [ `${this._prefix}-${this._placement}` ]: true
    };
  }

  setOverlayOrigin(origin: OverlayOrigin): void {
    this.overlayOrigin = origin;
  }

  constructor(private _cdr: ChangeDetectorRef) {
  }

  private isContentEmpty(): boolean {
    // return this.hiTemplate ? !(this.hiTemplate.elementRef.nativeElement as HTMLElement).hasChildNodes() : this.hiTitle === '';
    return (this.hiTemplate || this.hiContent) ? false : (this.hiTitle === '' || this.hiTitle == null); // Pity, can't detect whether hiTemplate is empty due to can't get it's content before shown up
  }
}
