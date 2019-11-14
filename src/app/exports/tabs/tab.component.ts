import {Component, ContentChild, Input} from '@angular/core';
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
  @ContentChild(TabTitleDirective, {static: false}) titleTpl: TabTitleDirective;
  @ContentChild(TabContentDirective, {static: false}) contentTpl: TabContentDirective;
}
