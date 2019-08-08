import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {Component, ElementRef, EventEmitter, Input, Output, Renderer2, TemplateRef, ViewChild} from '@angular/core';
import { OptionComponent } from './option.component';

@Component({
  selector           : '[hi-select-top-control]',
  preserveWhitespaces: false,
  animations         : [
    trigger('tagAnimation', [
      state('*', style({ opacity: 1, transform: 'scale(1)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'scale(0)' }),
        animate('150ms linear')
      ]),
      state('void', style({ opacity: 0, transform: 'scale(0)' })),
      transition('* => void', [
        style({ opacity: 1, transform: 'scale(1)' }),
        animate('150ms linear')
      ])
    ])
  ],
  template           : `
    <ng-template #inputTemplate>
      <input
        #inputElement
        autocomplete="off"
        class="hi-select-search__field"
        (compositionstart)="isComposing = true"
        (compositionend)="isComposing = false"
        (input)="updateWidth()"
        (keydown)="onKeyDownInput($event)"
        [ngModel]="inputValue"
        (ngModelChange)="setInputValue($event,true)"
        [disabled]="hiDisabled">
    </ng-template>
    <div
      *ngIf="hiPlaceHolder"
      hi-select-unselectable
      [style.display]="placeHolderDisplay"
      (click)="focusOnInput()"
      class="hi-select-selection__placeholder">
      {{ hiPlaceHolder }}
    </div>
    <!--single mode-->
    <ng-container *ngIf="isSingleMode">
      <!--selected label-->
      <div
        *ngIf="hiListOfSelectedValue.length"
        class="hi-select-selection-selected-value"
        [attr.title]="hiListOfSelectedValue[0].hiLabel"
        [ngStyle]="selectedValueDisplay">
        {{ singleValueLabel }}
      </div>
      <!--show search-->
      <div
        *ngIf="hiShowSearch"
        [style.display]="searchDisplay"
        class="hi-select-search hi-select-search--inline">
        <div class="hi-select-search__field__wrap">
          <ng-template [ngTemplateOutlet]="inputTemplate"></ng-template>
          <span class="hi-select-search__field__mirror">{{inputValue}}&nbsp;</span>
        </div>
      </div>
    </ng-container>
    <!--multiple or tags mode-->
    <ul *ngIf="isMultipleOrTags">
      <ng-container *ngFor="let value of hiListOfSelectedValue">
        <li
          *ngIf="isOptionDisplay(value)"
          [@tagAnimation]
          [attr.title]="getPropertyFromValue(value,'hiLabel')"
          [class.hi-select-selection__choice__disabled]="getPropertyFromValue(value,'hiDisabled')"
          class="hi-select-selection__choice">
          <div class="hi-select-selection__choice__content">{{ getPropertyFromValue(value, 'hiLabel') || value }}</div>
          <span *ngIf="!getPropertyFromValue(value,'hiDisabled')" class="hi-select-selection__choice__remove" (click)="removeValueFormSelected(value)"></span>
        </li>
      </ng-container>

      <li class="hi-select-search hi-select-search--inline">
        <ng-template [ngTemplateOutlet]="inputTemplate"></ng-template>
      </li>
    </ul>
  `,
  host               : {
    '[class.hi-select-selection__rendered]': 'true'
  }
})
export class SelectTopControlComponent {
  // tslint:disable-next-line:no-any
  private _listOfSelectedValue: any[];
  private _listTemplateOfOption: OptionComponent[] = [];
  listOfCachedSelectedOption: OptionComponent[] = [];
  inputValue: string;
  isComposing = false;
  @ViewChild('inputElement', {static: false}) inputElement: ElementRef;
  // tslint:disable-next-line:no-any
  @Output() hiListOfSelectedValueChange = new EventEmitter<any[]>();
  @Output() hiOnSearch = new EventEmitter<{ value: string, emit: boolean }>();
  @Input() hiMode = 'default';
  @Input() hiShowSearch = false;
  @Input() hiDisabled = false;

  @Input() hiPlaceHolder: string;
  @Input() hiOpen = false;
  // tslint:disable-next-line:no-any
  @Input() compareWith: (o1: any, o2: any) => boolean;

  @Input()
  // tslint:disable-next-line:no-any
  set hiListOfSelectedValue(value: any[]) {
    this._listOfSelectedValue = value;
    this.updateListOfCachedOption();
  }

  // tslint:disable-next-line:no-any
  get hiListOfSelectedValue(): any[] {
    return this._listOfSelectedValue;
  }

  @Input()
  set hiListTemplateOfOption(value: OptionComponent[]) {
    this._listTemplateOfOption = value;
    this.updateListOfCachedOption();
  }

  get hiListTemplateOfOption(): OptionComponent[] {
    return this._listTemplateOfOption;
  }

  /** cached selected option list **/
  updateListOfCachedOption(): void {
    if (this.isSingleMode) {
      const selectedOption = this.hiListTemplateOfOption.find(o => this.compareWith(o.hiValue, this.hiListOfSelectedValue[ 0 ]));
      if (selectedOption) {
        this.listOfCachedSelectedOption = [ selectedOption ];
      }
    } else {
      const listOfCachedOptionFromLatestTemplate = this.hiListTemplateOfOption.filter(o => !!this.hiListOfSelectedValue.find(v => this.compareWith(v, o.hiValue)));
      const restSelectedValue = this.hiListOfSelectedValue.filter(v => !listOfCachedOptionFromLatestTemplate.find(o => this.compareWith(o.hiValue, v)));
      const listOfCachedOptionFromOld = this.listOfCachedSelectedOption.filter(o => restSelectedValue.find(v => this.compareWith(o.hiValue, v)));
      this.listOfCachedSelectedOption = listOfCachedOptionFromLatestTemplate.concat(listOfCachedOptionFromOld);
    }
  }

  setInputValue(value: string, emit: boolean): void {
    this.inputValue = value;
    this.updateWidth();
    this.hiOnSearch.emit({ value, emit });
  }

  get isSingleMode(): boolean {
    return this.hiMode === 'default';
  }

  get isMultipleOrTags(): boolean {
    return this.hiMode === 'tags' || this.hiMode === 'multiple';
  }

  get placeHolderDisplay(): string {
    return this.inputValue || this.isComposing || this.hiListOfSelectedValue.length ? 'none' : 'block';
  }

  get searchDisplay(): string {
    return this.hiOpen ? 'block' : 'none';
  }

  get selectedValueDisplay(): { [key: string]: string } {
    let showSelectedValue = false;
    let opacity = 1;
    if (!this.hiShowSearch) {
      showSelectedValue = true;
    } else {
      if (this.hiOpen) {
        showSelectedValue = !(this.inputValue || this.isComposing);
        if (showSelectedValue) {
          opacity = 0.4;
        }
      } else {
        showSelectedValue = true;
      }
    }
    return {
      display: showSelectedValue ? 'block' : 'none',
      opacity: `${opacity}`
    };
  }

  get singleValueLabel(): string {
    return this.getPropertyFromValue(this.hiListOfSelectedValue[ 0 ], 'hiLabel');
  }

  focusOnInput(): void {
    setTimeout(() => {
      if (this.inputElement) {
        this.inputElement.nativeElement.focus();
      }
    });
  }

  // tslint:disable-next-line:no-any
  getPropertyFromValue(value: any, prop: string): string {
    const targetOption = this.listOfCachedSelectedOption.find(item => this.compareWith(item.hiValue, value));
    return targetOption ? targetOption[ prop ] : '';
  }

  // tslint:disable-next-line:no-any
  isOptionDisplay(value: any): boolean {
    return (this.hiMode === 'tags') || !!this.getPropertyFromValue(value, 'hiLabel');
  }

  // tslint:disable-next-line:no-any
  removeValueFormSelected(value: any): void {
    if (this.hiDisabled || this.getPropertyFromValue(value, 'hiDisabled')) {
      return;
    }
    this._listOfSelectedValue = this.hiListOfSelectedValue.filter(item => item !== value);
    this.hiListOfSelectedValueChange.emit(this.hiListOfSelectedValue);
  }

  updateWidth(): void {
    if (this.isMultipleOrTags && this.inputElement) {
      if (this.inputValue || this.isComposing) {
        this.renderer.setStyle(this.inputElement.nativeElement, 'width', `${this.inputElement.nativeElement.scrollWidth}px`);
      } else {
        this.renderer.removeStyle(this.inputElement.nativeElement, 'width');
      }
    }
  }

  onKeyDownInput(e: KeyboardEvent): void {
    const keyCode = e.keyCode;
    const eventTarget = e.target as HTMLInputElement;
    if (
      this.isMultipleOrTags &&
      !eventTarget.value &&
      // BackSpace
      keyCode === 8
    ) {
      e.preventDefault();
      if (this.hiListOfSelectedValue.length) {
        this.removeValueFormSelected(this.hiListOfSelectedValue[ this.hiListOfSelectedValue.length - 1 ]);
      }
    }
  }

  constructor(private renderer: Renderer2) {

  }
}
