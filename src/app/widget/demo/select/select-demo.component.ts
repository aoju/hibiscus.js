/**
 * Created by chenlei on 2018/3/28.
 */
// tslint:disable:no-any
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'nz-demo-select-basic',
  templateUrl: './select-demo.template.html',
})
export class SelectDemoComponent implements OnInit {
  selectedValue = 'lucy';
  listOfOption = [];
  listOfTagOptions = [];

  ngOnInit(): void {
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push({label: i.toString(36) + i, value: i.toString(36) + i});
    }
    this.listOfOption = children;
  }
}
