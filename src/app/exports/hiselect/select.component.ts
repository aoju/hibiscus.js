/**
 * Created by chenlei on 2018/5/22.
 */
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import {
  forwardRef,
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  SimpleChange,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNotNil } from '../utils/check';
import { toBoolean } from '../utils/convert';
import { OptionContainerComponent } from './option-container.component';
import { OptionGroupComponent } from './option-group.component';
import { OptionComponent } from './option.component';
import { defaultFilterOption, TFilterOption } from './option.pipe';
import { SelectTopControlComponent } from './select-top-control.component';

@Component({
  selector           : 'hi-select',
  preserveWhitespaces: false,
  providers          : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HiSelectComponent),
      multi      : true
    }
  ],
  animations         : [
    trigger('dropDownAnimation', [
      state('hidden', style({
        opacity: 0,
        display: 'none'
      })),
      state('bottom', style({
        opacity        : 1,
        transform      : 'scaleY(1)',
        transformOrigin: '0% 0%'
      })),
      state('top', style({
        opacity        : 1,
        transform      : 'scaleY(1)',
        transformOrigin: '0% 100%'
      })),
      transition('hidden => bottom', [
        style({
          opacity        : 0,
          transform      : 'scaleY(0.8)',
          transformOrigin: '0% 0%'
        }),
        animate('100ms cubic-bezier(0.755, 0.05, 0.855, 0.06)')
      ]),
      transition('bottom => hidden', [
        animate('100ms cubic-bezier(0.755, 0.05, 0.855, 0.06)', style({
          opacity        : 0,
          transform      : 'scaleY(0.8)',
          transformOrigin: '0% 0%'
        }))
      ]),
      transition('hidden => top', [
        style({
          opacity        : 0,
          transform      : 'scaleY(0.8)',
          transformOrigin: '0% 100%'
        }),
        animate('100ms cubic-bezier(0.755, 0.05, 0.855, 0.06)')
      ]),
      transition('top => hidden', [
        animate('100ms cubic-bezier(0.755, 0.05, 0.855, 0.06)', style({
          opacity        : 0,
          transform      : 'scaleY(0.8)',
          transformOrigin: '0% 100%'
        }))
      ])
    ])
  ],
  template           : `
    <div
      cdkOverlayOrigin
      class="hi-select-selection"
      [class.hi-select-selection--single]="isSingleMode"
      [class.hi-select-selection--multiple]="isMultipleOrTags"
      (keydown)="onKeyDownCdkOverlayOrigin($event)"
      tabindex="0">
      <div
        hi-select-top-control
        [hiOpen]="hiOpen"
        [compareWith]="compareWith"
        [hiPlaceHolder]="hiPlaceHolder"
        [hiShowSearch]="hiShowSearch"
        [hiDisabled]="hiDisabled"
        [hiMode]="hiMode"
        [hiListTemplateOfOption]="listOfTemplateOption"
        [hiListOfSelectedValue]="listOfSelectedValue"
        (hiOnSearch)="onSearch($event.value,$event.emit)"
        (hiListOfSelectedValueChange)="updateListOfSelectedValueFromTopControl($event)">
      </div>
      <span *ngIf="hiAllowClear" class="hi-select-selection__clear" hi-select-unselectable (click)="onClearSelection($event)"></span>
      <span class="hi-select-arrow" hi-select-unselectable><b></b></span>
    </div>
    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="true"
      [cdkConnectedOverlayOrigin]="cdkOverlayOrigin"
      (backdropClick)="closeDropDown()"
      (detach)="closeDropDown();"
      (positionChange)="onPositionChange($event)"
      [cdkConnectedOverlayWidth]="overlayWidth"
      [cdkConnectedOverlayMinWidth]="overlayMinWidth"
      [cdkConnectedOverlayOpen]="!isDestroy">
      <div [ngClass]="dropDownClassMap" [@dropDownAnimation]="hiOpen ? dropDownPosition : 'hidden' " [ngStyle]="hiDropdownStyle">
        <div
          style="overflow: auto"
          hi-option-container
          [listOfHiOptionComponent]="listOfHiOptionComponent"
          [listOfHiOptionGroupComponent]="listOfHiOptionGroupComponent"
          [hiSearchValue]="searchValue"
          [hiFilterOption]="hiFilterOption"
          [hiServerSearch]="hiServerSearch"
          [compareWith]="compareWith"
          [hiNotFoundContent]="hiNotFoundContent"
          [hiMaxMultipleCount]="hiMaxMultipleCount"
          [hiMode]="hiMode"
          (hiScrollToBottom)="hiScrollToBottom.emit()"
          (hiClickOption)="onClickOptionFromOptionContainer()"
          (hiListOfTemplateOptionChange)="listOfTemplateOptionChange($event)"
          (hiListOfSelectedValueChange)="updateListOfSelectedValueFromOptionContainer($event)"
          [hiListOfSelectedValue]="listOfSelectedValue">
        </div>
      </div>
    </ng-template>
    <!--can not use ViewChild since it will match sub options in option group -->
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `,
  host               : {
    '[class.hi-select]'            : 'true',
    '[class.hi-select-lg]'         : 'hiSize==="large"',
    '[class.hi-select-sm]'         : 'hiSize==="small"',
    '[class.hi-select-enabled]'    : '!hiDisabled',
    '[class.hi-select-disabled]'   : 'hiDisabled',
    '[class.hi-select-allow-clear]': 'hiAllowClear',
    '[class.hi-select-open]'       : 'hiOpen'
  }
})
export class HiSelectComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
  private _disabled = false;
  private _allowClear = false;
  private _showSearch = false;
  private _open = false;
  private _placeholder: string;
  private _autoFocus = false;
  private _dropdownClassName: string;
  onChange: (value: string | string[]) => void = () => null;
  onTouched: () => void = () => null;
  dropDownPosition: 'top' | 'center' | 'bottom' = 'bottom';
  // tslint:disable-next-line:no-any
  listOfSelectedValue: any[] = [];
  listOfTemplateOption: OptionComponent[] = [];
  // tslint:disable-next-line:no-any
  value: any | any[];
  overlayWidth: number;
  overlayMinWidth: number;
  searchValue: string = '';
  isDestroy = true;
  isInit = false;
  dropDownClassMap;
  @ViewChild(CdkOverlayOrigin) cdkOverlayOrigin: CdkOverlayOrigin;
  @ViewChild(CdkConnectedOverlay) cdkConnectedOverlay: CdkConnectedOverlay;
  @ViewChild(SelectTopControlComponent) hiSelectTopControlComponent: SelectTopControlComponent;
  @ViewChild(OptionContainerComponent) hiOptionContainerComponent: OptionContainerComponent;
  /** should move to hi-option-container when https://github.com/angular/angular/issues/20810 resolved **/
  @ContentChildren(OptionComponent) listOfHiOptionComponent: QueryList<OptionComponent>;
  @ContentChildren(OptionGroupComponent) listOfHiOptionGroupComponent: QueryList<OptionGroupComponent>;
  @Output() hiOnSearch = new EventEmitter<string>();
  @Output() hiScrollToBottom = new EventEmitter<void>();
  @Output() hiOpenChange = new EventEmitter<boolean>();
  @Input() hiSize = 'default';
  @Input() hiServerSearch = false;
  @Input() hiMode: 'default' | 'multiple' | 'tags' = 'default';
  @Input() hiDropdownMatchSelectWidth = true;
  @Input() hiFilterOption: TFilterOption = defaultFilterOption;
  @Input() hiMaxMultipleCount = Infinity;
  @Input() hiDropdownStyle: { [key: string]: string; };
  @Input() hiNotFoundContent: string;
  /** https://github.com/angular/angular/pull/13349/files **/
    // tslint:disable-next-line:no-any
  @Input() compareWith = (o1: any, o2: any) => o1 === o2;

  @Input()
  set hiDropdownClassName(value: string) {
    this._dropdownClassName = value;
    this.updateDropDownClassMap();
  }

  get hiDropdownClassName(): string {
    return this._dropdownClassName;
  }

  @Input()
  set hiAutoFocus(value: boolean) {
    this._autoFocus = toBoolean(value);
    this.updateAutoFocus();
  }

  get hiAutoFocus(): boolean {
    return this._autoFocus;
  }

  @Input()
  set hiOpen(value: boolean) {
    this._open = value;
    this.handleEscBug();
    this.updateCdkConnectedOverlayStatus();
    this.updateDropDownClassMap();
    if (this.hiOpen) {
      if (this.hiSelectTopControlComponent) {
        this.hiSelectTopControlComponent.focusOnInput();
        this.hiSelectTopControlComponent.setInputValue('', true);
      }
      if (this.hiOptionContainerComponent) {
        this.hiOptionContainerComponent.scrollIntoView();
      }
      if (this.cdkConnectedOverlay && this.cdkConnectedOverlay.overlayRef) {
        this.cdkConnectedOverlay.overlayRef.updatePosition();
      }
    } else {
      if (this.hiSelectTopControlComponent) {
        this.hiSelectTopControlComponent.setInputValue('', false);
      }
      if (this.hiOptionContainerComponent) {
        this.hiOptionContainerComponent.resetActiveOption();
      }
    }
  }

  get hiOpen(): boolean {
    return this._open;
  }

  @Input()
  set hiDisabled(value: boolean) {
    this._disabled = toBoolean(value);
    if (this.hiDisabled) {
      this.closeDropDown();
    }
  }

  get hiDisabled(): boolean {
    return this._disabled;
  }

  @Input()
  set hiAllowClear(value: boolean) {
    this._allowClear = toBoolean(value);
  }

  get hiAllowClear(): boolean {
    return this._allowClear;
  }

  @Input()
  set hiShowSearch(value: boolean) {
    this._showSearch = toBoolean(value);
  }

  get hiShowSearch(): boolean {
    return this._showSearch;
  }

  @Input()
  set hiPlaceHolder(value: string) {
    this._placeholder = value;
  }

  get hiPlaceHolder(): string {
    return this._placeholder;
  }

  @HostListener('click')
  onClick(): void {
    if (!this.hiDisabled) {
      this.hiOpen = !this.hiOpen;
      this.hiOpenChange.emit(this.hiOpen);
    }
  }

  updateAutoFocus(): void {
    if (this.isInit && this.hiSelectTopControlComponent.inputElement) {
      if (this.hiAutoFocus) {
        this.renderer.setAttribute(this.hiSelectTopControlComponent.inputElement.nativeElement, 'autofocus', 'autofocus');
      } else {
        this.renderer.removeAttribute(this.hiSelectTopControlComponent.inputElement.nativeElement, 'autofocus');
      }
    }
  }

  focus(): void {
    if (this.hiSelectTopControlComponent.inputElement) {
      this.hiSelectTopControlComponent.inputElement.nativeElement.focus();
    }
  }

  blur(): void {
    if (this.hiSelectTopControlComponent.inputElement) {
      this.hiSelectTopControlComponent.inputElement.nativeElement.blur();
    }
  }

  /** overlay can not be always open , reopen overlay after press esc **/
  handleEscBug(): void {
    if (this.hiOpen && this.cdkConnectedOverlay && this.cdkConnectedOverlay.overlayRef && !this.cdkConnectedOverlay.overlayRef.backdropElement) {
      this.cdkConnectedOverlay.open = true;
      this.cdkConnectedOverlay.ngOnChanges({ open: new SimpleChange(false, true, false) });
    }
  }

  onKeyDownCdkOverlayOrigin(e: KeyboardEvent): void {
    if (this.hiOptionContainerComponent) {
      this.hiOptionContainerComponent.onKeyDownUl(e);
    }
  }

  closeDropDown(): void {
    if (this.hiOpen) {
      this.onTouched();
      this.hiOpen = false;
      this.hiOpenChange.emit(this.hiOpen);
    }
  }

  onPositionChange(position: ConnectedOverlayPositionChange): void {
    this.dropDownPosition = position.connectionPair.originY;
    this.updateDropDownClassMap();
  }

  onClickOptionFromOptionContainer(): void {
    if (this.isSingleMode) {
      this.closeDropDown();
    } else if (this.hiMode === 'tags') {
      this.onSearch('', true);
    }
  }

  updateCdkConnectedOverlayStatus(): void {
    if (this.isInit && this.hiOpen && this.cdkOverlayOrigin) {
      if (this.hiDropdownMatchSelectWidth) {
        this.overlayWidth = this.cdkOverlayOrigin.elementRef.nativeElement.getBoundingClientRect().width;
        this.cdkConnectedOverlay.overlayRef.updateSize({ width: this.overlayWidth });
      } else {
        this.overlayMinWidth = this.cdkOverlayOrigin.elementRef.nativeElement.getBoundingClientRect().width;
        this.cdkConnectedOverlay.overlayRef.updateSize({ minWidth: this.overlayMinWidth });
      }

    }
    this.updateCdkConnectedOverlayPositions();
    if (this.cdkConnectedOverlay && this.cdkConnectedOverlay.overlayRef && this.cdkConnectedOverlay.overlayRef.backdropElement) {
      if (this.hiOpen) {
        this.renderer.removeStyle(this.cdkConnectedOverlay.overlayRef.backdropElement, 'display');
      } else {
        this.renderer.setStyle(this.cdkConnectedOverlay.overlayRef.backdropElement, 'display', 'none');
      }
    }
  }

  updateCdkConnectedOverlayPositions(): void {
    /** wait for input size change **/
    setTimeout(() => this.cdkConnectedOverlay.overlayRef.updatePosition(), 160);
  }

  get isSingleMode(): boolean {
    return this.hiMode === 'default';
  }

  get isMultipleOrTags(): boolean {
    return this.hiMode === 'tags' || this.hiMode === 'multiple';
  }

  /** option container hiListOfSelectedValueChange -> update ngModel **/
  // tslint:disable-next-line:no-any
  updateListOfSelectedValueFromOptionContainer(value: any[]): void {
    this.clearSearchValue();
    this.updateFromSelectedList(value);
  }

  /** option container hiListOfSelectedValueChange -> update ngModel **/
  // tslint:disable-next-line:no-any
  updateListOfSelectedValueFromTopControl(value: any[]): void {
    this.clearSearchValue();
    this.updateFromSelectedList(value);
  }

  // tslint:disable-next-line:no-any
  updateFromSelectedList(value: any[]): void {
    let modelValue;
    if (this.isSingleMode) {
      if (value.length) {
        modelValue = value[ 0 ];
      }
    } else {
      modelValue = value;
      this.updateCdkConnectedOverlayPositions();
    }
    this.updateNgModel(value, modelValue);
  }

  onSearch(value: string, emit: boolean): void {
    if (emit && (this.searchValue !== value)) {
      this.hiOnSearch.emit(value);
      this.searchValue = value;
    }
  }

  clearNgModel(): void {
    if (this.isSingleMode) {
      this.updateNgModel([], null);
    } else {
      this.updateNgModel([], []);
    }
  }

  // tslint:disable-next-line:no-any
  updateNgModel(list: any[], value: string | string[]): void {
    this.listOfSelectedValue = list;
    if (value !== this.value) {
      this.value = value;
      this.onChange(this.value);
    }
  }

  listOfTemplateOptionChange(value: OptionComponent[]): void {
    this.listOfTemplateOption = value;
  }

  updateDropDownClassMap(): void {
    this.dropDownClassMap = {
      [ 'hi-select-dropdown' ]                     : true,
      [ `hi-select-dropdown--single` ]             : this.isSingleMode,
      [ `hi-select-dropdown--multiple` ]           : this.isMultipleOrTags,
      [ `hi-select-dropdown-placement-bottomLeft` ]: this.dropDownPosition === 'bottom',
      [ `hi-select-dropdown-placement-topLeft` ]   : this.dropDownPosition === 'top',
      [ `${this.hiDropdownClassName}` ]             : !!this.hiDropdownClassName
    };
  }

  onClearSelection(e: MouseEvent): void {
    // TODO: should not clear disabled option ?
    e.stopPropagation();
    this.clearNgModel();
  }

  clearSearchValue(): void {
    if (this.isSingleMode) {
      this.hiSelectTopControlComponent.setInputValue('', false);
    } else {
      this.hiSelectTopControlComponent.setInputValue('', false);
    }
  }

  constructor(private renderer: Renderer2) {
  }

  /** update ngModel -> update listOfSelectedValue **/
  // tslint:disable-next-line:no-any
  writeValue(value: any | any[]): void {
    this.value = value;
    if (isNotNil(value)) {
      if (Array.isArray(value)) {
        this.listOfSelectedValue = value;
      } else {
        this.listOfSelectedValue = [ value ];
      }
    } else {
      this.listOfSelectedValue = [];
    }
  }

  registerOnChange(fn: (value: string | string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.hiDisabled = isDisabled;
  }

  ngOnInit(): void {
    this.isDestroy = false;
    this.updateDropDownClassMap();
  }

  ngAfterViewInit(): void {
    this.isInit = true;
    Promise.resolve().then(() => this.updateCdkConnectedOverlayStatus());
  }

  ngOnDestroy(): void {
    this.isDestroy = true;
  }
}
