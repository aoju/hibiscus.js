import {
  Component,
  QueryList,
  ContentChildren,
  Input,
  Output,
  EventEmitter,
  AfterContentInit
} from '@angular/core';
import {TabComponent} from './tab.component';
import {HiNGConfig} from '../hi.config';

@Component({
  selector: 'hi-tabs',
  templateUrl: './tabs.template.html',
  exportAs: 'tabs'
})
export class TabsComponent implements AfterContentInit {
  @Input() type: 'tabs' | 'pills' = 'tabs';
  @Input() activeTab: number | string;
  @Input() vertical: boolean;
  @Input() justified: boolean;
  @Input() cssClass: string;
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  @Output() activeTabChange = new EventEmitter<number | string>();

  constructor(hiNGConfig: HiNGConfig) {
    this.type = <any>hiNGConfig.tabs.type;
    this.justified = hiNGConfig.tabs.justified;
    this.vertical = hiNGConfig.tabs.vertical;
  }

  ngAfterContentInit(): void {
    if (!this.activeTab && this.tabs.length) {
      this.select(this.tabs.first.id);
    }
  }

  select(id: number | string) {
    const tab = this.tabs.find(item => item.id === id);
    if (tab && !tab.disabled) {
      this.activeTab = id;
      this.activeTabChange.emit(id);
    }
  }

}
