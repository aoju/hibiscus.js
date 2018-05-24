/**
 * Created by chenlei on 2018/5/22.
 */
/* tslint:disable:no-any */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'hiI18n'})
export class ContainerPipe implements PipeTransform {

  private _locale;


  private _getObjectPath(obj: object, path: string): string | object {
    let res = obj;
    const paths = path.split('.');
    const depth = paths.length;
    let index = 0;
    while (res && index < depth) {
      res = res[paths[index++]];
    }
    return index === depth ? res : null;
  }

  translate(path: string, data?: any): string {
    let content = this._getObjectPath(this._locale, path) as string;
    if (typeof content === 'string') {
      if (data) {
        Object.keys(data).forEach((key) => content = content.replace(new RegExp(`%${key}%`, 'g'), data[key]));
      }
      return content;
    }
    return path;
  }

  transform(path: string, keyValue?: object): string {
    return this.translate(path, keyValue);
  }
}

