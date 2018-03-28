import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'hi-linkage',
  templateUrl: './linkage.template.html'
})
export class LinkageComponent implements OnInit {

  public isExpand: Boolean = false;
  public list: Array<any>;

  @Output() result = new EventEmitter();
  @Input() selected: string;

  @Input()
  set data(data: any[]) {
      this.list = data;
  }

  ngOnInit() {
    this.list = this.data;
  }

  selectHandle(province: IMitAddress, city: IMitAddress, district: IMitAddress) {
    this.isExpand = false;
    this.selected = province + '/' + city + '/' + district;
    this.result.emit(this.selected);
  }

}

export interface IMitAddress {
  province: string;
  city: string;
  district: string;
}
