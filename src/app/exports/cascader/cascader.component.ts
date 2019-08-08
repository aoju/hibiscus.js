// tslint:disable:no-any
import {
  forwardRef,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {BACKSPACE, DOWN_ARROW, ENTER, ESCAPE, LEFT_ARROW, RIGHT_ARROW, UP_ARROW} from '@angular/cdk/keycodes';
import {ConnectedOverlayPositionChange} from '@angular/cdk/overlay';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {UpdateHostClassService} from '../common/services/update-host-class.service';
import {dropDownAnimation} from '../common/animation/dropdown-animations';

function toArray<T>(value: T | T[]): T[] {
  let ret: T[];
  if (value == null) {
    ret = [];
  } else if (!Array.isArray(value)) {
    ret = [value];
  } else {
    ret = value;
  }
  return ret;
}

function arrayEquals<T>(array1: T[], array2: T[]): boolean {
  if (!array1 || !array2 || array1.length !== array2.length) {
    return false;
  }

  const len = array1.length;
  for (let i = 0; i < len; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }
  return true;
}

const defaultDisplayRender = label => label.join(' / ');

export type CascaderExpandTrigger = 'click' | 'hover';
export type CascaderTriggerType = 'click' | 'hover';
export type CascaderSize = 'small' | 'large' | 'default' ;

export interface CascaderOption {
  value?: string;
  label?: string;
  title?: string;
  disabled?: boolean;
  loading?: boolean;
  isLeaf?: boolean;
  parent?: CascaderOption;
  children?: CascaderOption[];

  [key: string]: any;
}

@Component({
  selector: 'hi-cascader,[hi-cascader]',
  preserveWhitespaces: false,
  animations: [
    dropDownAnimation
  ],
  templateUrl : './cascader.component.html',
  styleUrls: ['./cascader.component.scss'],
  providers: [
    UpdateHostClassService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CascaderComponent),
      multi: true
    }
  ],
  host: {
    '[attr.tabIndex]': '"0"',
  },
  encapsulation: ViewEncapsulation.None,
})
export class CascaderComponent implements OnInit, OnDestroy, ControlValueAccessor {
  private allowClear = true;
  private autoFocus = false;
  private disabled = false;
  private enableCache = true;
  private showArrow = true;
  private showInput = true;
  private size: CascaderSize = 'default';
  private prefixCls = 'hi-cascader';
  private inputPrefixCls = 'hi-input';
  private menuClassName;
  private columnClassName;
  private changeOnSelect = false;
  // private showSearch = false;
  private defaultValue: any[];

  public dropDownPosition = 'bottom';
  public menuVisible = false;
  public isLoading = false;
  private isOpening = false;

  // 内部样式
  private _arrowCls: { [name: string]: any };
  private _clearCls: { [name: string]: any };
  private _inputCls: { [name: string]: any };
  private _labelCls: { [name: string]: any };
  private _loadingCls: { [name: string]: any };
  private _menuCls: { [name: string]: any };
  private _menuColumnCls: { [name: string]: any };

  public el: HTMLElement;
  private isFocused = false;

  /** 选择选项后，渲染显示文本 */
  private labelRenderTpl: TemplateRef<any>;
  public isLabelRenderTemplate = false;
  public labelRenderText: string;
  public labelRenderContext: any = {};

  // 当前值
  private value: any[];
  // 已选择的选项表示当前已确认的选项：selection will trigger value change
  private selectedOptions: CascaderOption[] = [];
  // 已激活的选项表示通过键盘方向键选择的选项，并未最终确认（除非按ENTER键）：activaction will not trigger value change
  private activatedOptions: CascaderOption[] = [];
  // 表示当前菜单的数据列：all data columns
  public hiColumns: CascaderOption[][] = [];

  // 显示或隐藏菜单计时器
  private delayTimer: any;
  private delaySelectTimer: any;

  /** 搜索相关的输入值 */
  private _inputValue = '';
  get inputValue(): string {
    return this._inputValue;
  }

  set inputValue(inputValue: string) {
    this._inputValue = inputValue;
    this.setClassMap();
  }

  // ngModel Access
  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;

  /** Display Render ngTemplate */
  @Input()
  set hiLabelRender(value: TemplateRef<any>) {
    this.labelRenderTpl = value;
    this.isLabelRenderTemplate = (value instanceof TemplateRef);
  }

  get hiLabelRender(): TemplateRef<any> {
    return this.labelRenderTpl;
  }

  /** prefixCls */
  @Input()
  set hiPrefixCls(prefixCls: string) {
    this.prefixCls = prefixCls;
    this.setClassMap();
    this.setLabelClass();
    this.setArrowClass();
    this.setLoadingClass();
    this.setClearClass();
    this.setInputClass();
    this.setMenuClass();
    this.setMenuColumnClass();
  }

  get hiPrefixCls(): string {
    return this.prefixCls;
  }

  /** Whether is disabled */
  @Input()
  set hiDisabled(value: boolean) {
    this.disabled = coerceBooleanProperty(value);
    this.setClassMap();
    this.setInputClass();
  }

  get hiDisabled(): boolean {
    return this.disabled;
  }

  /** Input size, one of `large` `default` `small` */
  @Input()
  set hiSize(value: CascaderSize) {
    this.size = value;
    this.setClassMap();
    this.setInputClass();
  }

  get hiSize(): CascaderSize {
    return this.size;
  }

  /** Whether show input box. Defaults to `true`. */
  @Input()
  set hiShowInput(value: boolean) {
    this.showInput = coerceBooleanProperty(value);
  }

  get hiShowInput(): boolean {
    return this.showInput;
  }

  /** Whether can search. Defaults to `false`. */

  /* // not support yet
  @Input()
  set hiShowSearch(value: boolean) {
    this.showSearch = coerceBooleanProperty(value);
  }
  get hiShowSearch(): boolean {
    return this.showSearch;
  }
  */

  /** Whether allow clear. Defaults to `true`. */
  @Input()
  set hiAllowClear(value: boolean) {
    this.allowClear = coerceBooleanProperty(value);
  }

  get hiAllowClear(): boolean {
    return this.allowClear;
  }

  /** Whether auto focus. */
  @Input()
  set hiAutoFocus(value: boolean) {
    this.autoFocus = coerceBooleanProperty(value);
  }

  get hiAutoFocus(): boolean {
    return this.autoFocus;
  }

  /** Whether to show arrow */
  @Input()
  set hiShowArrow(value: boolean) {
    this.showArrow = coerceBooleanProperty(value);
  }

  get hiShowArrow(): boolean {
    return this.showArrow;
  }

  /** Additional className of popup overlay */
  @Input()
  set hiMenuClassName(value: string) {
    this.menuClassName = value;
    this.setMenuClass();
  }

  get hiMenuClassName(): string {
    return this.menuClassName;
  }

  /** Additional className of popup overlay column */
  @Input()
  set hiColumnClassName(value: string) {
    this.columnClassName = value;
    this.setMenuColumnClass();
  }

  get hiColumnClassName(): string {
    return this.columnClassName;
  }

  /** Options for first column, sub column will be load async */
  @Input() set options(options: CascaderOption[] | null) {
    this.hiColumns = options && options.length ? [options] : [];
    if (this.defaultValue && this.hiColumns.length) {
      this.initOptions(0);
    }
  }

  get options(): CascaderOption[] {
    return this.hiColumns[0];
  }

  /** Change value on each selection if set to true */
  @Input()
  set hiChangeOnSelect(value: boolean) {
    this.changeOnSelect = coerceBooleanProperty(value);
  }

  get hiChangeOnSelect(): boolean {
    return this.changeOnSelect;
  }

  /** Hover text for the clear icon */
  @Input() hiClearText = 'Clear';

  /** Expand column item when click or hover, one of 'click' 'hover' */
  @Input() hiExpandTrigger: CascaderExpandTrigger = 'click';

  /** Specify content to show when no result matches. */
  @Input() hiNotFoundContent = 'Not Found';

  /** Input placeholder */
  @Input() hiPlaceHolder = 'Please select';

  /** Additional style of popup overlay */
  @Input() hiMenuStyle: { [key: string]: string; };

  /** Change value on selection only if this function returns `true` */
  @Input() hiChangeOn: (option: CascaderOption, level: number) => boolean;

  /** Delay time to show when mouse enter, when `hiExpandTrigger` is `hover`. */
  @Input() hiMouseEnterDelay = 150; // ms

  /** Delay time to hide when mouse enter, when `hiExpandTrigger` is `hover`. */
  @Input() hiMouseLeaveDelay = 150; // ms

  /** Triggering mode: can be Array<'click'|'hover'> */
  @Input() hiTriggerAction: CascaderTriggerType | CascaderTriggerType[] = ['click'];

  /** Property name for getting `value` in the option */
  @Input() hiValueProperty = 'value';

  /** Property name for getting `label` in the option */
  @Input() hiLabelProperty = 'label';

  /** 异步加载数据 */
  @Input() hiLoadData: (node: CascaderOption, index?: number) => PromiseLike<any>;

  /** Event: emit on popup show or hide */
  @Output() hiVisibleChange = new EventEmitter<boolean>();

  /** Event: emit on values changed */
  @Output() hiChange = new EventEmitter<any[]>();

  /** Event: emit on values and selection changed */
  @Output() hiSelectionChange = new EventEmitter<CascaderOption[]>();

  /**
   * Event: emit on option selected, event data：{option: any, index: number}
   */
  @Output() hiSelect = new EventEmitter<{
    option: CascaderOption,
    index: number
  }>();

  /** Event: emit on the clear button clicked */
  @Output() hiClear = new EventEmitter<any>();

  /** 浮层菜单 */
  @ViewChild('menu', {static: false}) menu: ElementRef;

  public onPositionChange(position: ConnectedOverlayPositionChange): void {
    const newValue = position.connectionPair.originY === 'bottom' ? 'bottom' : 'top';
    if (this.dropDownPosition !== newValue) {
      this.dropDownPosition = newValue;
      this.cdr.detectChanges();
    }
  }

  public focus(): void {
    if (!this.isFocused) {
      const input = this.el.querySelector(`.${this.prefixCls}-input`) as HTMLElement;
      if (input && input.focus) {
        input.focus();
      } else {
        this.el.focus();
      }
      this.isFocused = true;
      this.setClassMap();
    }
  }

  public blur(): void {
    if (this.isFocused) {
      const input = this.el.querySelector(`.${this.prefixCls}-input`) as HTMLElement;
      if (input && input.blur) {
        input.blur();
      } else {
        this.el.blur();
      }
      this.isFocused = false;
      this.setClassMap();
    }
  }


  private setClassMap(): void {
    const classMap = {
      [`${this.prefixCls}`]: 1,
      [`${this.prefixCls}-picker`]: 1,
      [`${this.prefixCls}-lg`]: this.hiSize === 'large',
      [`${this.prefixCls}-sm`]: this.hiSize === 'small',
      [`${this.prefixCls}-picker-disabled`]: this.disabled,
      [`${this.prefixCls}-focused`]: this.isFocused,
      [`${this.prefixCls}-picker-open`]: this.menuVisible,
      [`${this.prefixCls}-picker-with-value`]: this.inputValue && this.inputValue.length
    };
    this.updateHostClassService.updateHostClass(this.el, classMap);
  }

  /** 标签 样式 */
  public get labelCls(): any {
    return this._labelCls;
  }

  private setLabelClass(): void {
    this._labelCls = {
      [`${this.prefixCls}-picker-label`]: true
    };
  }

  /** 箭头 样式 */
  public get arrowCls(): any {
    return this._arrowCls;
  }

  private setArrowClass(): void {
    this._arrowCls = {
      [`${this.prefixCls}-picker-arrow`]: true,
      [`${this.prefixCls}-picker-arrow-expand`]: this.menuVisible
    };
  }

  /** 加载中图标 样式 */
  public get loadingCls(): any {
    return this._loadingCls;
  }

  private setLoadingClass(): void {
    this._loadingCls = {
      [`${this.prefixCls}-picker-arrow`]: true
    };
  }

  /** 清除图标 样式 */
  public get clearCls(): any {
    return this._clearCls;
  }

  private setClearClass(): void {
    this._clearCls = {
      [`${this.prefixCls}-picker-clear`]: true
    };
  }

  /** 输入框 样式 */
  public get inputCls(): any {
    return this._inputCls;
  }

  private setInputClass(): void {
    this._inputCls = {
      [`${this.prefixCls}-input`]: 1,
      [`${this.inputPrefixCls}-disabled`]: this.hiDisabled,
      [`${this.inputPrefixCls}-lg`]: this.hiSize === 'large',
      [`${this.inputPrefixCls}-sm`]: this.hiSize === 'small'
    };
  }

  /** 浮层 样式 */
  public get menuCls(): any {
    return this._menuCls;
  }

  private setMenuClass(): void {
    this._menuCls = {
      [`${this.prefixCls}-menus`]: true,
      [`${this.prefixCls}-menus-hidden`]: !this.menuVisible,
      [`${this.hiMenuClassName}`]: this.hiMenuClassName
    };
  }

  /** 浮层列 样式 */
  public get menuColumnCls(): any {
    return this._menuColumnCls;
  }

  private setMenuColumnClass(): void {
    this._menuColumnCls = {
      [`${this.prefixCls}-menu`]: true,
      [`${this.hiColumnClassName}`]: this.hiColumnClassName
    };
  }

  /** 获取列中Option的样式 */
  public getOptionCls(option: CascaderOption, index: number): any {
    return {
      [`${this.prefixCls}-menu-item`]: true,
      [`${this.prefixCls}-menu-item-expand`]: !option.isLeaf,
      [`${this.prefixCls}-menu-item-active`]: this.isActivedOption(option, index),
      [`${this.prefixCls}-menu-item-disabled`]: option.disabled,
      [`${this.prefixCls}-menu-item-loading`]: option.loading
    };
  }

  /** prevent input change event */
  public handlerInputChange(event: Event): void {
    event.stopPropagation();
  }

  /** input element blur */
  public handleInputBlur(event: Event): void {
    /*
    if (!this.hiShowSearch) {
      return;
    }
    */
    if (this.menuVisible) {
      this.focus(); // keep input has focus when menu opened
    } else {
      this.blur();
    }
  }

  /** input element focus */
  public handleInputFocus(event: Event): void {
    /*
    if (!this.hiShowSearch) {
      return;
    }
    */
    this.focus();
  }

  private hasInput(): boolean {
    return this.inputValue.length > 0;
  }

  private hasValue(): boolean {
    return this.value && this.value.length > 0;
  }

  /** Whether to show input element placeholder */
  public get showPlaceholder(): boolean {
    return !(this.hasInput() || this.hasValue());
  }

  /** Whether the clear button is visible */
  public get showClearIcon(): boolean {
    const isHasValue = this.hasValue();
    const isHasInput = this.hasInput();
    return this.hiAllowClear && !this.hiDisabled && (isHasValue || isHasInput);
  }

  /** clear the input box and selected options */
  public clearSelection(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.labelRenderText = '';
    this.isLabelRenderTemplate = false;
    this.selectedOptions = [];
    this.activatedOptions = [];
    this.inputValue = '';
    this.setMenuVisible(false);

    // trigger change event
    this.onValueChange();
  }

  private buildDisplayLabel(): void {
    const selectedOptions = this.selectedOptions;
    const labels: string[] = selectedOptions.map(o => this.getOptionLabel(o));
    // 设置当前控件的显示值
    if (this.isLabelRenderTemplate) {
      this.labelRenderContext = {labels, selectedOptions};
    } else {
      this.labelRenderText = defaultDisplayRender.call(this, labels, selectedOptions);
    }
  }

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    if (keyCode !== DOWN_ARROW &&
      keyCode !== UP_ARROW &&
      keyCode !== LEFT_ARROW &&
      keyCode !== RIGHT_ARROW &&
      keyCode !== ENTER &&
      keyCode !== BACKSPACE &&
      keyCode !== ESCAPE) {
      return;
    }

    // Press any keys above to reopen menu
    if (!this.isMenuVisible() &&
      keyCode !== BACKSPACE &&
      keyCode !== ESCAPE) {
      this.setMenuVisible(true);
      return;
    }
    // Press ESC to close menu
    if (keyCode === ESCAPE) {
      // this.setMenuVisible(false); // already call by cdk-overlay detach
      return;
    }

    if (this.isMenuVisible()) {
      event.preventDefault();
      if (keyCode === DOWN_ARROW) {
        this.moveDown();
      } else if (keyCode === UP_ARROW) {
        this.moveUp();
      } else if (keyCode === LEFT_ARROW) {
        this.moveLeft();
      } else if (keyCode === RIGHT_ARROW) {
        this.moveRight();
      } else if (keyCode === ENTER) {
        this.onEnter();
      }
    }
  }

  @HostListener('click', ['$event'])
  public onTriggerClick(event: MouseEvent): void {
    if (this.hiDisabled) {
      return;
    }
    this.onTouched(); // set your control to 'touched'

    if (this.isClickTiggerAction()) {
      this.delaySetMenuVisible(!this.menuVisible, 100);
    }
  }

  @HostListener('mouseenter', ['$event'])
  public onTriggerMouseEnter(event: MouseEvent): void {
    if (this.hiDisabled) {
      return;
    }
    if (this.isPointerTiggerAction()) {
      this.delaySetMenuVisible(true, this.hiMouseEnterDelay, true);
    }
  }

  @HostListener('mouseleave', ['$event'])
  public onTriggerMouseLeave(event: MouseEvent): void {
    if (this.hiDisabled) {
      return;
    }
    if (!this.isMenuVisible() || this.isOpening) {
      event.preventDefault();
      return;
    }
    if (this.isPointerTiggerAction()) {
      const mouseTarget = event.relatedTarget as HTMLElement;
      const hostEl = this.el;
      const menuEl = this.menu && this.menu.nativeElement as HTMLElement;
      if (hostEl.contains(mouseTarget) || (menuEl && menuEl.contains(mouseTarget))
      /*|| mouseTarget.parentElement.contains(menuEl)*/) {
        // 因为浮层的backdrop出现，暂时没有办法自动消失
        return;
      }
      this.delaySetMenuVisible(false, this.hiMouseLeaveDelay);
    }
  }

  private isClickTiggerAction(): boolean {
    if (typeof this.hiTriggerAction === 'string') {
      return this.hiTriggerAction === 'click';
    }
    return this.hiTriggerAction.indexOf('click') !== -1;
  }

  private isPointerTiggerAction(): boolean {
    if (typeof this.hiTriggerAction === 'string') {
      return this.hiTriggerAction === 'hover';
    }
    return this.hiTriggerAction.indexOf('hover') !== -1;
  }

  public closeMenu(): void {
    this.clearDelayTimer();
    this.setMenuVisible(false);
  }

  private clearDelayTimer(): void {
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = null;
    }
  }

  /**
   * 显示或者隐藏菜单
   *
   * @param visible true-显示，false-隐藏
   * @param delay 延迟时间
   */
  public delaySetMenuVisible(visible: boolean, delay: number, setOpening = false): void {
    this.clearDelayTimer();
    if (delay) {
      if (visible && setOpening) {
        this.isOpening = true;
      }
      this.delayTimer = setTimeout(() => {
        this.setMenuVisible(visible);
        this.clearDelayTimer();
        if (visible) {
          setTimeout(() => {
            this.isOpening = false;
          }, 100);
        }
      }, delay);
    } else {
      this.setMenuVisible(visible);
    }
  }

  public isMenuVisible(): boolean {
    return this.menuVisible;
  }

  public setMenuVisible(menuVisible: boolean): void {
    if (this.hiDisabled) {
      return;
    }

    if (this.menuVisible !== menuVisible) {
      this.menuVisible = menuVisible;

      // update class
      this.setClassMap();
      this.setArrowClass();
      this.setMenuClass();

      if (menuVisible) {
        this.beforeVisible();
      }
      this.hiVisibleChange.emit(menuVisible);
    }
  }

  /** load init data if necessary */
  private beforeVisible(): void {
    this.loadRootOptions();
  }

  private loadRootOptions(): void {
    if (!this.hiColumns.length) {
      const root: any = {};
      this.loadChildren(root, -1);
    }
  }

  /** 获取Option的值，例如，可以指定labelProperty="name"来取Name */
  public getOptionLabel(option: CascaderOption): any {
    return option[this.hiLabelProperty || 'label'];
  }

  /** 获取Option的值，例如，可以指定valueProperty="id"来取ID */
  public getOptionValue(option: CascaderOption): any {
    return option[this.hiValueProperty || 'value'];
  }

  private isActivedOption(option: CascaderOption, index: number): boolean {
    const activeOpt = this.activatedOptions[index];
    return activeOpt === option;
  }

  /**
   * 设置某列的激活的菜单选项
   *
   * @param option 菜单选项
   * @param index  选项所在的列组的索引
   * @param select 是否触发选择结点
   */
  private setActiveOption(option: CascaderOption, index: number, select = false, loadChildren = true): void {
    if (!option || option.disabled) {
      return;
    }

    this.activatedOptions[index] = option;

    // 当直接选择最后一级时，前面的选项要补全。例如，选择“城市”，则自动补全“国家”、“省份”
    for (let i = index - 1; i >= 0; i--) {
      if (!this.activatedOptions[i]) {
        this.activatedOptions[i] = this.activatedOptions[i + 1].parent;
      }
    }
    // 截断多余的选项，如选择“省份”，则只会有“国家”、“省份”，去掉“城市”、“区县”
    if (index < this.activatedOptions.length - 1) {
      this.activatedOptions = this.activatedOptions.slice(0, index + 1);
    }

    // load children
    if (option.children && option.children.length) {
      option.isLeaf = false;
      option.children.forEach(child => child.parent = option);
      this.setColumnData(option.children, index + 1);
    } else if (!option.isLeaf && loadChildren) {
      this.loadChildren(option, index);
    } else {
      // clicking leaf node will remove any children columns
      if (index < this.hiColumns.length - 1) {
        this.hiColumns = this.hiColumns.slice(0, index + 1);
      }
    }

    // trigger select event, and display label
    if (select) {
      this.onSelectOption(option, index);
    }
  }

  private loadChildren(option: CascaderOption, index: number, success?: () => void, failure?: () => void): void {
    if (this.hiLoadData) {
      this.isLoading = index < 0;
      option.loading = true;
      this.hiLoadData(option, index).then(() => {
        option.loading = this.isLoading = false;
        if (option.children) {
          option.children.forEach(child => child.parent = index < 0 ? undefined : option);
          this.setColumnData(option.children, index + 1);
        }
        if (success) {
          success();
        }
      }, () => {
        option.loading = this.isLoading = false;
        option.isLeaf = true;
        if (failure) {
          failure();
        }
      });
    }
  }

  private onSelectOption(option: CascaderOption, index: number): void {
    // trigger `hiSelect` event
    this.hiSelect.emit({option, index});

    // 生成显示
    if (option.isLeaf || this.hiChangeOnSelect || this.isChangeOn(option, index)) {
      this.selectedOptions = this.activatedOptions;
      // 设置当前控件的显示值
      this.buildDisplayLabel();
      // 触发变更事件
      this.onValueChange();
    }

    // close menu if click on leaf
    if (option.isLeaf) {
      this.delaySetMenuVisible(false, this.hiMouseLeaveDelay);
    }
  }

  /** 由用户来定义点击后是否变更 */
  private isChangeOn(option: CascaderOption, index: number): boolean {
    if (typeof this.hiChangeOn === 'function') {
      return this.hiChangeOn(option, index) === true;
    }
    return false;
  }

  private setColumnData(options: CascaderOption[], index: number): void {
    if (!arrayEquals(this.hiColumns[index], options)) {
      this.hiColumns[index] = options;
      if (index < this.hiColumns.length - 1) {
        this.hiColumns = this.hiColumns.slice(0, index + 1);
      }
    }
  }

  /**
   * 鼠标点击选项
   *
   * @param option 菜单选项
   * @param index 选项所在的列组的索引
   * @param event 鼠标事件
   */
  onOptionClick(option: CascaderOption, index: number, event: Event): void {
    event.preventDefault();

    // Keep focused state for keyboard support
    this.el.focus();

    if (option && option.disabled) {
      return;
    }
    this.setActiveOption(option, index, true);
  }

  /** 按下回车键时选择 */
  private onEnter(): void {
    const columnIndex = Math.max(this.activatedOptions.length - 1, 0);
    const activeOption = this.activatedOptions[columnIndex];
    if (activeOption && !activeOption.disabled) {
      this.onSelectOption(activeOption, columnIndex);
    }
  }

  /**
   * press `up` or `down` arrow to activate the sibling option.
   */
  private moveUpOrDown(isUp: boolean): void {
    const columnIndex = Math.max(this.activatedOptions.length - 1, 0);
    // 该组中已经被激活的选项
    const activeOption = this.activatedOptions[columnIndex];
    // 该组所有的选项，用于遍历获取下一个被激活的选项
    const options = this.hiColumns[columnIndex] || [];
    const length = options.length;
    let nextIndex = -1;
    if (!activeOption) { // 该列还没有选中的选项
      nextIndex = isUp ? length : -1;
    } else {
      nextIndex = options.indexOf(activeOption);
    }

    while (true) {
      nextIndex = isUp ? nextIndex - 1 : nextIndex + 1;
      if (nextIndex < 0 || nextIndex >= length) {
        break;
      }
      const nextOption = options[nextIndex];
      if (!nextOption || nextOption.disabled) {
        continue;
      }
      this.setActiveOption(nextOption, columnIndex);
      break;
    }
  }

  private moveUp(): void {
    this.moveUpOrDown(true);
  }

  private moveDown(): void {
    this.moveUpOrDown(false);
  }

  /**
   * press `left` arrow to remove the last selected option.
   */
  private moveLeft(): void {
    const options = this.activatedOptions;
    if (options.length) {
      options.pop(); // Remove the last one
    }
  }

  /**
   * press `right` arrow to select the next column option.
   */
  private moveRight(): void {
    const length = this.activatedOptions.length;
    const options = this.hiColumns[length];
    if (options && options.length) {
      const nextOpt = options.find(o => !o.disabled);
      if (nextOpt) {
        this.setActiveOption(nextOpt, length);
      }
    }
  }

  /**
   * 鼠标划入选项
   *
   * @param option 菜单选项
   * @param index 选项所在的列组的索引
   * @param event 鼠标事件
   */
  onOptionMouseEnter(option: CascaderOption, index: number, event: Event): void {
    event.preventDefault();
    if (this.hiExpandTrigger === 'hover' && !option.isLeaf) {
      this.delaySelect(option, index, true);
    }
  }

  /**
   * 鼠标划出选项
   *
   * @param option 菜单选项
   * @param index 选项所在的列组的索引
   * @param event 鼠标事件
   */
  onOptionMouseLeave(option: CascaderOption, index: number, event: Event): void {
    event.preventDefault();
    if (this.hiExpandTrigger === 'hover' && !option.isLeaf) {
      this.delaySelect(option, index, false);
    }
  }

  private clearDelaySelectTimer(): void {
    if (this.delaySelectTimer) {
      clearTimeout(this.delaySelectTimer);
      this.delaySelectTimer = null;
    }
  }

  private delaySelect(option: CascaderOption, index: number, doSelect: boolean): void {
    this.clearDelaySelectTimer();
    if (doSelect) {
      this.delaySelectTimer = setTimeout(() => {
        this.setActiveOption(option, index, true);
        this.delaySelectTimer = null;
      }, 150);
    }
  }

  public getSubmitValue(): any[] {
    const values: any[] = [];
    this.selectedOptions.forEach(option => {
      values.push(this.getOptionValue(option));
    });
    return values;
  }

  private onValueChange(): void {
    const value = this.getSubmitValue();
    if (!arrayEquals(this.value, value)) {
      this.defaultValue = null; // clear the init-value
      this.value = value;
      this.onChange(value); // Angular need this
      if (value.length === 0) {
        this.hiClear.emit(); // first trigger `clear` and then `change`
      }
      this.hiSelectionChange.emit(this.selectedOptions);
      this.hiChange.emit(value);
    }
  }

  constructor(private elementRef: ElementRef,
              private cdr: ChangeDetectorRef,
              private updateHostClassService: UpdateHostClassService) {
    this.el = this.elementRef.nativeElement;
  }

  private findOption(option: any, index: number): CascaderOption {
    const options: CascaderOption[] = this.hiColumns[index];
    if (options) {
      const value = typeof option === 'object' ? this.getOptionValue(option) : option;
      return options.find(o => value === this.getOptionValue(o));
    }
    return null;
  }

  private isLoaded(index: number): boolean {
    return this.hiColumns[index] && this.hiColumns[index].length > 0;
  }

  private activateOnInit(index: number, value: any): void {
    let option = this.findOption(value, index);
    if (!option) {
      option = typeof value === 'object' ? value : {
        [`${this.hiValueProperty || 'value'}`]: value,
        [`${this.hiLabelProperty || 'label'}`]: value
      };
    }
    this.setActiveOption(option, index, false, false);
  }

  private initOptions(index: number): void {
    const vs = this.defaultValue;
    const load = () => {
      this.activateOnInit(index, vs[index]);
      if (index < vs.length - 1) {
        this.initOptions(index + 1);
      }
      if (index === vs.length - 1) {
        this.afterWriteValue();
      }
    };

    if (this.isLoaded(index) || !this.hiLoadData) {
      load();
    } else {
      const node = this.activatedOptions[index - 1] || {};
      this.loadChildren(node, index - 1, load, this.afterWriteValue);
    }
  }

  afterWriteValue(): void {
    this.selectedOptions = this.activatedOptions;
    this.value = this.getSubmitValue();
    this.buildDisplayLabel();
  }

  /**
   * Write a new value to the element.
   *
   * @Override (From ControlValueAccessor interface)
   */
  writeValue(value: any): void {
    const vs = this.defaultValue = toArray(value);
    if (vs.length) {
      this.initOptions(0);
    } else {
      this.value = vs;
      this.activatedOptions = [];
      this.afterWriteValue();
    }
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.closeMenu();
    }
    this.hiDisabled = isDisabled;
  }

  ngOnInit(): void {
    // 设置样式
    this.setClassMap();
    this.setLabelClass();
    this.setArrowClass();
    this.setLoadingClass();
    this.setClearClass();
    this.setInputClass();
    this.setMenuClass();
    this.setMenuColumnClass();
  }

  ngOnDestroy(): void {
    this.clearDelayTimer();
    this.clearDelaySelectTimer();
  }

}
