import {Component, Input, ContentChild} from '@angular/core';
import {TabContentDirective} from './tab-content.directive';
import {TabTitleDirective} from './tab-title.directive';

@Component({
  selector: 'hi-tab',
  template: ''
})
export class TabComponent {
  @Input() id: number | string;
  @Input() icon: string;
  @Input() title: string;
  @Input() content: string;
  @Input() disabled = false;
  @ContentChild(TabTitleDirective) titleTpl: TabTitleDirective;
  @ContentChild(TabContentDirective) contentTpl: TabContentDirective;
}
