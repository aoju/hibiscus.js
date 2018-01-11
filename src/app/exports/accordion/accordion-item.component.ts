import {
  Component, Inject, Input, OnDestroy, OnInit, Output, EventEmitter
} from '@angular/core';
import {AccordionComponent} from './accordion.component';

/**
 * Instead of using `header` attribute on the `hi-accordion-item`, you can use
 * an `hi-accordion-header``hi-accordion-body` attribute on `any` element inside of a group that
 * will be used as group's header template.
 */
@Component({
  selector: 'hi-accordion-item',
  templateUrl: './accordion-item.template.html',
  exportAs: 'accordionItem'
})
export class AccordionItemComponent implements OnInit, OnDestroy {
  /** Clickable text in accordion's group header, check `accordion heading` below for using html in header */
  @Input() header: string;
  /** if <code>true</code> — disables accordion item */
  @Input() isDisabled: boolean;
  /** Emits when the opened state changes */
  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter();

  /** Is accordion item open or closed. This property supports two-way binding */
  @Input()
  get isOpen(): boolean {
    return this._isOpen;
  }

  set isOpen(value: boolean) {
    if (value !== this.isOpen) {
      if (value) {
        this.accordion.closeOtherPanels(this);
      }
      this._isOpen = value;
      Promise.resolve(null).then(() => {
        this.isOpenChange.emit(value);
      });
    }
  }

  protected _isOpen = false;
  protected accordion: AccordionComponent;

  constructor(@Inject(AccordionComponent) accordion: AccordionComponent) {
    this.accordion = accordion;
  }

  ngOnInit(): any {
    this.accordion.addGroup(this);
  }

  ngOnDestroy(): any {
    this.accordion.removeGroup(this);
  }

  toggleOpen(event: Event): any {
    if (!this.isDisabled) {
      this.isOpen = !this.isOpen;
    }
  }

}
