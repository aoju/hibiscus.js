import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  Input,
  QueryList,
  TemplateRef
} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {trimWhiteSpace} from '../utils/trim-whitespace';
import {InputDirective} from './input.directive';

export type InputGroupIconClass = string | string[] | Set<string> | { [klass: string]: any; };
export type InputGroupSizeType = 'large' | 'default' | 'small';

@Component({
  selector: 'hi-input-group',
  preserveWhitespaces: false,
  template: `
    <span class="ant-input-wrapper ant-input-group" *ngIf="isAddOn">
      <span class="ant-input-group-addon" *ngIf="hiAddOnBefore || hiAddOnBeforeIcon">
        <i [ngClass]="hiAddOnBeforeIcon" *ngIf="hiAddOnBeforeIcon"></i>
        <ng-container *ngIf="isAddOnBeforeString; else addOnBeforeTemplate">{{ hiAddOnBefore }}</ng-container>
        <ng-template #addOnBeforeTemplate>
          <ng-template [ngTemplateOutlet]="hiAddOnBefore"></ng-template>
        </ng-template>
      </span>
      <ng-template *ngTemplateOutlet="contentTemplate"></ng-template>
      <span class="ant-input-group-addon" *ngIf="hiAddOnAfter || hiAddOnAfterIcon">
        <i [ngClass]="hiAddOnAfterIcon" *ngIf="hiAddOnAfterIcon"></i>
        <ng-container *ngIf="isAddOnAfterString; else addOnAfterTemplate">{{ hiAddOnAfter }}</ng-container>
        <ng-template #addOnAfterTemplate>
          <ng-template [ngTemplateOutlet]="hiAddOnAfter"></ng-template>
        </ng-template>
      </span>
    </span>
    <ng-template [ngIf]="isAffix">
      <span class="ant-input-prefix" *ngIf="hiPrefix || hiPrefixIcon">
        <i [ngClass]="hiPrefixIcon" *ngIf="hiPrefixIcon"></i>
        <ng-container *ngIf="isPrefixString; else prefixTemplate">{{ hiPrefix }}</ng-container>
        <ng-template #prefixTemplate>
          <ng-template [ngTemplateOutlet]="hiPrefix"></ng-template>
        </ng-template>
      </span>
      <ng-template *ngTemplateOutlet="contentTemplate"></ng-template>
      <span class="ant-input-suffix" *ngIf="hiSuffix || hiSuffixIcon">
        <i [ngClass]="hiSuffixIcon" *ngIf="hiSuffixIcon"></i>
        <ng-container *ngIf="isSuffixString; else suffixTemplate">{{ hiSuffix }}</ng-container>
        <ng-template #suffixTemplate>
          <ng-template [ngTemplateOutlet]="hiSuffix"></ng-template>
        </ng-template>
      </span>
    </ng-template>
    <ng-template [ngIf]="isGroup" *ngTemplateOutlet="contentTemplate"></ng-template>
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `
})

export class InputGroupComponent implements AfterViewInit, AfterContentInit {
  private _addOnBefore: string | TemplateRef<void> = '';
  private _addOnAfter: string | TemplateRef<void> = '';
  private _prefix: string | TemplateRef<void> = '';
  private _suffix: string | TemplateRef<void> = '';
  private _size: InputGroupSizeType = 'default';
  private _compact = false;
  private _search = false;
  private isAddOnBeforeString: boolean;
  private isAddOnAfterString: boolean;
  private isPrefixString: boolean;
  private isSuffixString: boolean;
  @ContentChildren(InputDirective) InputDirectiveQueryList: QueryList<InputDirective>;
  @Input() hiAddOnBeforeIcon: InputGroupIconClass;
  @Input() hiAddOnAfterIcon: InputGroupIconClass;
  @Input() hiPrefixIcon: InputGroupIconClass;
  @Input() hiSuffixIcon: InputGroupIconClass;

  @Input() set hiSize(value: InputGroupSizeType) {
    this._size = value;
    this.updateChildrenInputSize();
  }

  get hiSize(): InputGroupSizeType {
    return this._size;
  }

  @Input()
  @HostBinding(`class.ant-input-group-compact`)
  set hiCompact(value: boolean) {
    this._compact = coerceBooleanProperty(value);
  }

  get hiCompact(): boolean {
    return this._compact;
  }

  @Input()
  set hiAddOnBefore(value: string | TemplateRef<void>) {
    this.isAddOnBeforeString = !(value instanceof TemplateRef);
    this._addOnBefore = value;
  }

  get hiAddOnBefore(): string | TemplateRef<void> {
    return this._addOnBefore;
  }

  @Input()
  set hiAddOnAfter(value: string | TemplateRef<void>) {
    this.isAddOnAfterString = !(value instanceof TemplateRef);
    this._addOnAfter = value;
  }

  get hiAddOnAfter(): string | TemplateRef<void> {
    return this._addOnAfter;
  }

  @Input()
  set hiPrefix(value: string | TemplateRef<void>) {
    this.isPrefixString = !(value instanceof TemplateRef);
    this._prefix = value;
  }

  get hiPrefix(): string | TemplateRef<void> {
    return this._prefix;
  }

  @Input()
  set hiSuffix(value: string | TemplateRef<void>) {
    this.isSuffixString = !(value instanceof TemplateRef);
    this._suffix = value;
  }

  get hiSuffix(): string | TemplateRef<void> {
    return this._suffix;
  }

  @Input()
  @HostBinding(`class.ant-input-search-enter-button`)
  @HostBinding(`class.ant-input-search`)
  set hiSearch(value: boolean) {
    this._search = coerceBooleanProperty(value);
  }

  get hiSearch(): boolean {
    return this._search;
  }

  get isLarge(): boolean {
    return this.hiSize === 'large';
  }

  get isSmall(): boolean {
    return this.hiSize === 'small';
  }

  @HostBinding('class.ant-input-affix-wrapper')
  get isAffix(): boolean {
    return !!(this.hiSuffix || this.hiPrefix || this.hiPrefixIcon || this.hiSuffixIcon);
  }

  @HostBinding('class.ant-input-group-wrapper')
  get isAddOn(): boolean {
    return !!(this.hiAddOnAfter || this.hiAddOnBefore || this.hiAddOnAfterIcon || this.hiAddOnBeforeIcon);
  }

  @HostBinding('class.ant-input-group')
  get isGroup(): boolean {
    return (!this.isAffix) && (!this.isAddOn);
  }

  @HostBinding(`class.ant-input-group-lg`)
  get isLargeGroup(): boolean {
    return this.isGroup && this.isLarge;
  }

  @HostBinding(`class.ant-input-group-wrapper-lg`)
  get isLargeGroupWrapper(): boolean {
    return this.isAddOn && this.isLarge;
  }

  @HostBinding(`class.ant-input-affix-wrapper-lg`)
  get isLargeAffix(): boolean {
    return this.isAffix && this.isLarge;
  }

  @HostBinding(`class.ant-input-search-lg`)
  get isLargeSearch(): boolean {
    return this.hiSearch && this.isLarge;
  }

  @HostBinding(`class.ant-input-group-sm`)
  get isSmallGroup(): boolean {
    return this.isGroup && this.isSmall;
  }

  @HostBinding(`class.ant-input-affix-wrapper-sm`)
  get isSmallAffix(): boolean {
    return this.isAffix && this.isSmall;
  }

  @HostBinding(`class.ant-input-group-wrapper-sm`)
  get isSmallGroupWrapper(): boolean {
    return this.isAddOn && this.isSmall;
  }

  @HostBinding(`class.ant-input-search-sm`)
  get isSmallSearch(): boolean {
    return this.hiSearch && this.isSmall;
  }

  updateChildrenInputSize(): void {
    if (this.InputDirectiveQueryList) {
      this.InputDirectiveQueryList.forEach(item => item.hiSize = this.hiSize);
    }
  }

  constructor(private el: ElementRef) {

  }

  ngAfterContentInit(): void {
    this.updateChildrenInputSize();
  }

  ngAfterViewInit(): void {
    trimWhiteSpace(this.el.nativeElement);
  }
}
