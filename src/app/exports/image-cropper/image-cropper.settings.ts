export interface ICropperSettings {
  canvasWidth?: number;
  canvasHeight?: number;
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  minWithRelativeToResolution?: boolean;
  croppedWidth?: number;
  croppedHeight?: number;
  touchRadius?: number;
  cropperDrawSettings?: any;
  noFileInput?: boolean;
  allowedFilesRegex?: RegExp;
  rounded: boolean;
  keepAspect: boolean;
  preserveSize: boolean;
  cropOnResize: boolean;
  compressRatio: number;
}

export class CropperDrawSettings {
  public lineDash = false;
  public strokeWidth = 1;
  public strokeColor = 'rgba(255,255,255,1)';
  public dragIconStrokeWidth = 1;
  public dragIconStrokeColor = 'rgba(0,0,0,1)';
  public dragIconFillColor = 'rgba(255,255,255,1)';

  constructor(settings?: any) {
    if (typeof settings === 'object') {
      this.lineDash = settings.lineDash || this.lineDash;
      this.strokeWidth = settings.strokeWidth || this.strokeWidth;
      this.strokeColor = settings.strokeColor || this.strokeColor;
      this.dragIconStrokeWidth =
        settings.dragIconStrokeWidth || this.dragIconStrokeWidth;
      this.dragIconStrokeColor =
        settings.dragIconStrokeColor || this.dragIconStrokeColor;
      this.dragIconFillColor =
        settings.dragIconFillColor || this.dragIconFillColor;
    }
  }
}

export class ImageCropperSettings implements ICropperSettings {
  public canvasWidth = 300;
  public canvasHeight = 300;

  public dynamicSizing = false;
  public cropperClass: string;
  public croppingClass: string;

  public width = 200;
  public height = 200;

  public minWidth = 50;
  public minHeight = 50;
  public minWithRelativeToResolution = true;

  public croppedWidth = 100;
  public croppedHeight = 100;

  public cropperDrawSettings: CropperDrawSettings = new CropperDrawSettings();
  public touchRadius = 20;
  public noFileInput = false;

  public fileType: string;

  public resampleFn: Function;

  public markerSizeMultiplier = 1;
  public centerTouchRadius = 20;
  public showCenterMarker = true;

  public allowedFilesRegex: RegExp = /\.(jpe?g|png|gif|bmp)$/i;
  public cropOnResize = true;
  public preserveSize = false;

  public compressRatio = 1.0;

  private _rounded = false;
  private _keepAspect = true;

  constructor(settings?: any) {
    if (typeof settings === 'object') {
      this.canvasWidth = settings.canvasWidth || this.canvasWidth;
      this.canvasHeight = settings.canvasHeight || this.canvasHeight;
      this.width = settings.width || this.width;
      this.height = settings.height || this.height;
      this.minWidth = settings.minWidth || this.minWidth;
      this.minHeight = settings.minHeight || this.minHeight;
      this.minWithRelativeToResolution =
        settings.minWithRelativeToResolution ||
        this.minWithRelativeToResolution;
      this.croppedWidth = settings.croppedWidth || this.croppedWidth;
      this.croppedHeight = settings.croppedHeight || this.croppedHeight;
      this.touchRadius = settings.touchRadius || this.touchRadius;
      this.cropperDrawSettings =
        settings.cropperDrawSettings || this.cropperDrawSettings;
      this.noFileInput = settings.noFileInput || this.noFileInput;
      this.allowedFilesRegex =
        settings.allowedFilesRegex || this.allowedFilesRegex;
      this.rounded = settings.rounded || this.rounded;
      this.keepAspect = settings.keepAspect || this.keepAspect;
      this.preserveSize = settings.preserveSize || this.preserveSize;
      this.cropOnResize = settings.cropOnResize || this.cropOnResize;
      this.compressRatio = settings.compressRatio || this.compressRatio;

      this.cropperDrawSettings =
        settings.cropperDrawSettings || this.cropperDrawSettings;
    }
  }

  set rounded(val: boolean) {
    this._rounded = val;
    if (val) {
      this._keepAspect = true;
    }
  }

  get rounded(): boolean {
    return this._rounded;
  }

  set keepAspect(val: boolean) {
    if (val === false && this._rounded) {
      throw new Error(
        'Cannot set keep aspect to false on rounded cropper. Ellipsis not supported'
      );
    }

    this._keepAspect = val;
  }

  get keepAspect(): boolean {
    return this._keepAspect;
  }
}
