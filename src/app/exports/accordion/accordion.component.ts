import {Component, Input} from '@angular/core';
import {AccordionItemComponent} from './accordion-item.component';

@Component({
  selector: 'hi-accordion',
  template: '<ng-content></ng-content>',
  exportAs: 'accordion'
})
export class AccordionComponent {

  @Input() closeOthers: boolean;
  protected groups: AccordionItemComponent[] = [];

  closeOtherPanels(openGroup: AccordionItemComponent): void {
    if (!this.closeOthers) {
      return;
    }

    this.groups.forEach((group: AccordionItemComponent) => {
      if (group !== openGroup) {
        group.isOpen = false;
      }
    });
  }

  addGroup(group: AccordionItemComponent): void {
    this.groups.push(group);
  }

  removeGroup(group: AccordionItemComponent): void {
    const index = this.groups.indexOf(group);
    if (index !== -1) {
      this.groups.splice(index, 1);
    }
  }
}
