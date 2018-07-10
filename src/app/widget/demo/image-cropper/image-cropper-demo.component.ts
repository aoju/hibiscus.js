import {Component} from '@angular/core';

@Component({
  selector: 'hi-image-cropper-demo',
  templateUrl: './image-cropper-demo.template.html'
})
export class ImageCropperDemoComponent {

  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(image: string) {
    this.croppedImage = image;
  }

  imageLoaded() {
    // show cropper
  }

  loadImageFailed() {
    // show message
  }
}
