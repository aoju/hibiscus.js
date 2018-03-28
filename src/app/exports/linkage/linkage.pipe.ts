import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'linkagePipe'
})
export class LinkagePipe implements PipeTransform {

  transform(data: any, parentcode?: any): any {
    if (!parentcode && data) {
      return data.filter(this.isProvince);
    } else if (parentcode) {
      return this.isChild(data, parentcode);
    }
    return [];
  }

  isProvince(e) {
    if (e.level !== '1') {
      return !e.parentcode;
    }
    return e.parentcode;
  }

  isChild(data, parentcode) {
    const _data = [];
    data.forEach((item) => {
      if (item.parentcode === parentcode) {
        _data.push(item);
      }
    });
    return _data;
  }

}
