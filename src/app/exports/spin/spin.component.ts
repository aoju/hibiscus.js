import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  NgZone,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { first } from 'rxjs/operators/first';

import { isEmpty, isNotNil } from '../utils/check';
import { toBoolean } from '../utils/convert';

@Component({
  selector           : 'hi-spin',
  preserveWhitespaces: false,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  template           : `
    <ng-template #defaultIndicatorTemplate>
      <span
        class="hi-spin-dot"
        [class.hi-spin-dot-spin]="resultSpinning$|async">
        <i></i><i></i><i></i><i></i>
      </span>
    </ng-template>
    <div [class.hi-spin-nested-loading]="isNested">
      <div>
        <div
          class="hi-spin"
          [class.hi-spin-spinning]="resultSpinning$|async"
          [class.hi-spin-lg]="hiSize=='large'"
          [class.hi-spin-sm]="hiSize=='small'"
          [class.hi-spin-show-text]="hiTip">
          <ng-template [ngTemplateOutlet]="hiIndicator||defaultIndicatorTemplate"></ng-template>
          <div class="hi-spin-text" *ngIf="hiTip">{{ hiTip }}</div>
        </div>
      </div>
      <div
        #containerElement
        class="hi-spin-container"
        [class.hi-spin-blur]="resultSpinning$|async"
        [hidden]="!isNested"
        (cdkObserveContent)="checkNested()">
        <ng-content></ng-content>
      </div>
    </div>`,
    styleUrls: ['./spin.component.scss']
})
export class SpinComponent implements AfterViewInit {
  private _tip: string;
  private _delay = 0;
  el: HTMLElement;
  isNested = false;
  baseSpinning$ = new BehaviorSubject(true);
  resultSpinning$: Observable<boolean> = this.baseSpinning$.asObservable().pipe(debounceTime(this.hiDelay));
  @ViewChild('containerElement', {static: false}) containerElement: ElementRef;
  @Input() hiIndicator: TemplateRef<void>;
  @Input() hiSize = 'default';

  @Input()
  set hiDelay(value: number) {
    if (isNotNil(value)) {
      this._delay = value;
      this.resultSpinning$ = this.baseSpinning$.asObservable().pipe(debounceTime(this.hiDelay));
    }
  }

  get hiDelay(): number {
    return this._delay;
  }

  @Input()
  set hiTip(value: string) {
    this._tip = value;
  }

  get hiTip(): string {
    return this._tip;
  }

  @Input()
  set hiSpinning(value: boolean) {
    this.baseSpinning$.next(toBoolean(value));
  }

  checkNested(): void {
    /** no way to detect empty https://github.com/angular/angular/issues/12530 **/
    if (!isEmpty(this.containerElement.nativeElement)) {
      this.isNested = true;
      this.renderer.setStyle(this.el, 'display', 'block');
    } else {
      this.isNested = false;
      this.renderer.removeStyle(this.el, 'display');
    }
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private zone: NgZone) {
    this.el = this.elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    this.zone.onStable.pipe(first()).subscribe(() => {
      this.checkNested();
    });
  }
}
