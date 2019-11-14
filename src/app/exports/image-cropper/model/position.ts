import {Bounds} from './bounds';
import {IHandle} from './handle';

export class CropperPosition {
  public x: number;
  public y: number;
  public w: number;
  public h: number;

  constructor(x = 0, y = 0, w = 0, h = 0) {
    this.x = +x;
    this.y = +y;
    this.w = +w;
    this.h = +h;
  }

  public toBounds(): Bounds {
    return new Bounds(this.x, this.y, this.w, this.h);
  }

  public isInitialized(): boolean {
    return this.x !== 0 && this.y !== 0 && this.w !== 0 && this.h !== 0;
  }
}

export class CropperTouch {
  public x: number;
  public y: number;
  public id: number;

  public dragHandle: IHandle;

  constructor(x = 0, y = 0, id = 0) {
    this.id = id;
    this.x = x;
    this.y = y;
  }
}
