export interface IPoint {
  x: number;
  y: number;
  next: Point;
  prev: Point;
}

export class Point implements IPoint {
  public x: number;
  public y: number;

  private _next: Point;
  private _prev: Point;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  public get next(): Point {
    return this._next;
  }

  public set next(p: Point) {
    this._next = p;
  }

  public get prev(): Point {
    return this._prev;
  }

  public set prev(p: Point) {
    this._prev = p;
  }
}

export class PointPool {
  private static _instance: PointPool;

  private borrowed: number;
  private firstAvailable: Point;

  constructor(initialSize: number) {
    PointPool._instance = this;
    let prev: Point = (this.firstAvailable = new Point());

    for (let i = 1; i < initialSize; i++) {
      let p = new Point();
      prev.next = p;
      prev = p;
    }
  }

  static get instance(): PointPool {
    return PointPool._instance;
  }

  public borrow(x: number, y: number): Point {
    if (this.firstAvailable == null) {
      throw 'Pool exhausted';
    }
    this.borrowed++;
    let p: Point = this.firstAvailable;
    this.firstAvailable = p.next;
    p.x = x;
    p.y = y;
    return p;
  }

  public returnPoint(p: Point) {
    this.borrowed--;
    p.x = 0;
    p.y = 0;
    p.next = this.firstAvailable;
    this.firstAvailable = p;
  }
}
