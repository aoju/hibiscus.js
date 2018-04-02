import {Pipe, PipeTransform} from '@angular/core';
import {formatDate, parseDate} from '../../utils/date-utils';

@Pipe({
  name: 'hiDate'
})
export class DatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value) {
      const date = parseDate(value);
      const format = args && args[0] ? args[0] : 'YYYY-MM-DD HH:mm:ss';
      return formatDate(date, format);
    }
  }
}
