import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import {HiOptionGroupComponent} from './hi-option-group.component';
import {HiOptionComponent} from './hi-option.component';

import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {merge} from 'rxjs/operators/merge';
import {HiOptionLiComponent} from './hi-option-li.component';
import {defaultFilterOption, HiOptionPipe, TFilterOption} from './hi-option.pipe';

@Component({
  selector: '[hi-option-container]',
  preserveWhitespaces: false,
  template: `
    <ul
      #dropdownUl
      class="ant-select-dropdown-menu ant-select-dropdown-menu-root ant-select-dropdown-menu-vertical"
      role="menu"
      (keydown)="onKeyDownUl($event)"
      (scroll)="dropDownScroll($event,dropdownUl)"
      tabindex="0">
      <li
        *ngIf="isNotFoundDisplay"
        hi-select-unselectable
        class="ant-select-dropdown-menu-item ant-select-dropdown-menu-item-disabled">
        {{ hiNotFoundContent ? hiNotFoundContent : ('Select.notFoundContent' | hiI18n) }}
      </li>
      <li
        *ngIf="isAddTagOptionDisplay"
        hi-select-unselectable
        (click)="addTagOption()"
        class="ant-select-dropdown-menu-item ant-select-dropdown-menu-item-active">
        {{ hiSearchValue }}
      </li>
      <li
        hi-option-li
        [compareWith]="compareWith"
        *ngFor="let option of listOfHiOptionComponent | hiFilterOptionPipe : hiSearchValue : hiFilterOption : hiServerSearch "
        (click)="clickOption(option,false)"
        [hiActiveOption]="activatedOption"
        [hiOption]="option"
        [hiListOfSelectedValue]="hiListOfSelectedValue">
      </li>
      <li
        *ngFor="let group of listOfHiOptionGroupComponent | hiSubFilterOptionPipe : hiSearchValue : hiFilterOption : hiServerSearch"
        class="ant-select-dropdown-menu-item-group">
        <div
          class="ant-select-dropdown-menu-item-group-title"
          [attr.title]="group.isLabelString ? group.hiLabel : ''">
          <ng-container *ngIf="group.isLabelString; else labelTemplate">{{ group.hiLabel }}</ng-container>
          <ng-template #labelTemplate>
            <ng-template [ngTemplateOutlet]="group.hiLabel"></ng-template>
          </ng-template>
        </div>
        <ul class="ant-select-dropdown-menu-item-group-list">
          <li
            hi-option-li
            [compareWith]="compareWith"
            *ngFor="let option of group.listOfHiOptionComponent | hiFilterOptionPipe : hiSearchValue : hiFilterOption : hiServerSearch"
            (click)="clickOption(option,false)"
            [hiActiveOption]="activatedOption"
            [hiShowActive]="!isAddTagOptionDisplay"
            [hiOption]="option"
            [hiListOfSelectedValue]="hiListOfSelectedValue">
          </li>
        </ul>
      </li>
      <li
        hi-option-li
        [compareWith]="compareWith"
        *ngFor="let option of listOfTagOption | hiFilterOptionPipe : hiSearchValue : hiFilterOption : hiServerSearch "
        (click)="clickOption(option,false)"
        [hiActiveOption]="activatedOption"
        [hiShowActive]="!isAddTagOptionDisplay"
        [hiOption]="option"
        [hiListOfSelectedValue]="hiListOfSelectedValue">
      </li>
    </ul>`
})
export class HiOptionContainerComponent implements AfterContentInit, OnDestroy {
  // tslint:disable-next-line:no-any
  private _listOfSelectedValue: any[];
  private _searchValue: string;
  isInit = false;
  isAddTagOptionDisplay = false;
  listOfAllTemplateOption: HiOptionComponent[] = [];
  optionSubscription: Subscription;
  groupSubscription: Subscription;
  listOfTagOption: HiOptionComponent[] = [];
  listOfFilterOption: HiOptionComponent[] = [];
  activatedOption: HiOptionComponent;
  /** can not use ViewChild since it will match sub options in option group **/
  @ViewChildren(HiOptionLiComponent) listOfHiOptionLiComponent: QueryList<HiOptionLiComponent>;
  @Input() listOfHiOptionComponent: QueryList<HiOptionComponent>;
  @Input() listOfHiOptionGroupComponent: QueryList<HiOptionGroupComponent>;
  // tslint:disable-next-line:no-any
  @Output() hiListOfSelectedValueChange = new EventEmitter<any[]>();
  @Output() hiListOfTemplateOptionChange = new EventEmitter<HiOptionComponent[]>();
  @Output() hiClickOption = new EventEmitter<void>();
  @Output() hiScrollToBottom = new EventEmitter<void>();
  @Input() hiMode = 'default';
  @Input() hiServerSearch = false;
  @Input() hiFilterOption: TFilterOption = defaultFilterOption;
  @Input() hiMaxMultipleCount = Infinity;
  @Input() hiNotFoundContent: string;
  // tslint:disable-next-line:no-any
  @Input() compareWith = (o1: any, o2: any) => o1 === o2;

  @Input()
  set hiSearchValue(value: string) {
    this._searchValue = value;
    this.updateAddTagOptionDisplay();
    this.updateListOfFilterOption();
  }

  get hiSearchValue(): string {
    return this._searchValue;
  }

  @Input()
  // tslint:disable-next-line:no-any
  set hiListOfSelectedValue(value: any[]) {
    if (this._listOfSelectedValue !== value) {
      this._listOfSelectedValue = value;
      /** should clear activedOption when listOfSelectedValue change **/
      this.clearActivatedOption();
      this.refreshAllOptionStatus(false);
    }
  }

  // tslint:disable-next-line:no-any
  get hiListOfSelectedValue(): any[] {
    return this._listOfSelectedValue;
  }

  addTagOption(): void {
    if (this.hiListOfSelectedValue.length < this.hiMaxMultipleCount) {
      this.hiListOfSelectedValue = [...this.hiListOfSelectedValue, this.hiSearchValue];
      this.hiListOfSelectedValueChange.emit(this.hiListOfSelectedValue);
    }
  }

  clickOption(option: HiOptionComponent, isPressEnter: boolean): void {
    this.updateSelectedOption(option, isPressEnter);
    this.hiClickOption.emit();
  }

  onKeyDownUl(e: KeyboardEvent): void {
    if ([38, 40, 13].indexOf(e.keyCode) > -1) {
      e.preventDefault();
      const activeIndex = this.listOfFilterOption.findIndex(item => item === this.activatedOption);
      if (e.keyCode === 38) {
        // arrow up
        const preIndex = activeIndex > 0 ? (activeIndex - 1) : (this.listOfFilterOption.length - 1);
        this.setActiveOption(this.listOfFilterOption[preIndex]);
      } else if (e.keyCode === 40) {
        // arrow down
        const nextIndex = activeIndex < this.listOfFilterOption.length - 1 ? (activeIndex + 1) : 0;
        this.setActiveOption(this.listOfFilterOption[nextIndex]);
      } else if (e.keyCode === 13) {
        // enter
        if (this.isTagsMode) {
          if (!this.isAddTagOptionDisplay) {
            this.clickOption(this.activatedOption, true);
          } else {
            this.addTagOption();
            this.hiClickOption.emit();
          }
        } else {
          this.clickOption(this.activatedOption, true);
        }
      }
    }
  }

  resetActiveOption(): void {
    const firstActiveOption = this.listOfAllTemplateOption.concat(this.listOfTagOption).find(item => this.compareWith(item.hiValue, this.hiListOfSelectedValue[0]));
    this.setActiveOption(firstActiveOption);
  }

  clearActivatedOption(): void {
    this.setActiveOption(null);
  }

  setActiveOption(option: HiOptionComponent, scroll: boolean = true): void {
    this.activatedOption = option;
    if (scroll) {
      this.scrollIntoView();
    }
  }

  scrollIntoView(): void {
    if (this.listOfHiOptionLiComponent && this.listOfHiOptionLiComponent.length) {
      const targetLi = this.listOfHiOptionLiComponent.find(o => o.hiOption === this.activatedOption);
      if (targetLi && targetLi.el) {
        setTimeout(() => targetLi.el.scrollIntoView(false), 150);
      }
    }
  }

  updateSelectedOption(option: HiOptionComponent, isPressEnter: boolean): void {
    /** update listOfSelectedOption -> update hiListOfSelectedValue -> emit hiListOfSelectedValueChange **/
    if (option && !option.hiDisabled) {
      let changed = false;
      this.setActiveOption(option);
      let listOfSelectedValue = [...this.hiListOfSelectedValue];
      if (this.isMultipleOrTags) {
        const targetValue = listOfSelectedValue.find(o => this.compareWith(o, option.hiValue));
        if (targetValue) {
          if (!isPressEnter) {
            /** should not toggle option when press enter **/
            listOfSelectedValue.splice(listOfSelectedValue.indexOf(targetValue), 1);
            changed = true;
          }
        } else if (this.hiListOfSelectedValue.length < this.hiMaxMultipleCount) {
          listOfSelectedValue.push(option.hiValue);
          changed = true;
        }
      } else if (!this.compareWith(listOfSelectedValue[0], option.hiValue)) {
        listOfSelectedValue = [option.hiValue];
        changed = true;
      }
      /** update selectedValues when click option **/
      if (changed) {
        this._listOfSelectedValue = listOfSelectedValue;
        this.hiListOfSelectedValueChange.emit(this.hiListOfSelectedValue);
        if (this.isTagsMode) {
          this.refreshAllOptionStatus(false);
        }
      }
    }
  }

  refreshListOfTagOption(): void {
    if (this.isTagsMode) {
      /** refresh tags option **/
      const listOfTagsOption = [];
      this.hiListOfSelectedValue.forEach(value => {
        const existedOption = this.listOfAllTemplateOption.find(o => this.compareWith(o.hiValue, value));
        if (!existedOption) {
          const hiOptionComponent = new HiOptionComponent();
          hiOptionComponent.hiValue = value;
          hiOptionComponent.hiLabel = value;
          listOfTagsOption.push(hiOptionComponent);
        }
      });
      this.listOfTagOption = listOfTagsOption;
    }

  }

  refreshListOfAllTemplateOption(): void {
    this.listOfAllTemplateOption = this.listOfHiOptionComponent.toArray().concat(this.listOfHiOptionGroupComponent.toArray().reduce((pre, cur) => [...pre, ...cur.listOfHiOptionComponent.toArray()], []));
    Promise.resolve().then(() => this.hiListOfTemplateOptionChange.emit(this.listOfAllTemplateOption));
  }

  refreshAllOptionStatus(isTemplateOptionChange: boolean): void {
    /** update hiListOfSelectedValue | update option list -> update listOfAllTemplateOption -> update listOfSelectedOption -> update activatedOption **/
    if (this.isInit) {
      if (isTemplateOptionChange) {
        this.refreshListOfAllTemplateOption();
      }
      this.refreshListOfTagOption();
      this.updateListOfFilterOption();
      this.updateAddTagOptionDisplay();
    }
  }

  updateListOfFilterOption(): void {
    this.listOfFilterOption = new HiOptionPipe().transform(this.listOfAllTemplateOption.concat(this.listOfTagOption), this.hiSearchValue, this.hiFilterOption, this.hiServerSearch);
    if (this.hiSearchValue) {
      this.setActiveOption(this.listOfFilterOption[0]);
    }
  }

  /** watch options change in option group **/
  watchSubOptionChanges(): void {
    this.unsubscribeOption();
    let optionChanges$ = new Subject().asObservable().pipe(merge(this.listOfHiOptionGroupComponent.changes)).pipe(merge(this.listOfHiOptionComponent.changes));
    if (this.listOfHiOptionGroupComponent.length) {
      this.listOfHiOptionGroupComponent.forEach(group => optionChanges$ = group.listOfHiOptionComponent ? optionChanges$.pipe(merge(group.listOfHiOptionComponent.changes)) : optionChanges$);
    }
    this.optionSubscription = optionChanges$.subscribe(() => this.refreshAllOptionStatus(true));
  }

  unsubscribeGroup(): void {
    if (this.groupSubscription) {
      this.groupSubscription.unsubscribe();
      this.groupSubscription = null;
    }
  }

  unsubscribeOption(): void {
    if (this.optionSubscription) {
      this.optionSubscription.unsubscribe();
      this.optionSubscription = null;
    }
  }

  get isTagsMode(): boolean {
    return this.hiMode === 'tags';
  }

  get isMultipleOrTags(): boolean {
    return this.hiMode === 'tags' || this.hiMode === 'multiple';
  }

  get isNotFoundDisplay(): boolean {
    return (!this.isTagsMode) && (!this.listOfFilterOption.length);
  }

  updateAddTagOptionDisplay(): void {
    const listOfAllOption = this.listOfAllTemplateOption.concat(this.listOfTagOption).map(item => item.hiLabel);
    const isMatch = listOfAllOption.indexOf(this.hiSearchValue) > -1;
    this.isAddTagOptionDisplay = this.isTagsMode && this.hiSearchValue && (!isMatch);
  }

  dropDownScroll(e: MouseEvent, ul: HTMLUListElement): void {
    e.preventDefault();
    e.stopPropagation();
    if (ul && (ul.scrollHeight - ul.scrollTop === ul.clientHeight)) {
      this.hiScrollToBottom.emit();
    }
  }

  ngAfterContentInit(): void {
    this.isInit = true;
    this.refreshAllOptionStatus(true);
    this.watchSubOptionChanges();
    this.groupSubscription = this.listOfHiOptionGroupComponent.changes.subscribe(() => this.watchSubOptionChanges());
  }

  ngOnDestroy(): void {
    this.unsubscribeGroup();
    this.unsubscribeOption();
  }
}
