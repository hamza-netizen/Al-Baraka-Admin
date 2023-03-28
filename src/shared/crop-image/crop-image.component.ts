import {
  Component,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { AppComponentBase } from '@shared/common/app-component-base';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import * as _ from 'lodash';
//#pciture related
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';
import { CropOutput, CropSettings } from '../Interfaces/crop-settings-dto.model';


@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.component.html',
  styleUrls: ['./crop-image.component.css']
})
export class CropImageComponent extends AppComponentBase implements OnInit {

  @ViewChild('cropImageModal', { static: true })
  modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  @Input() imgToBeSet: any;
  @Input() showPrevImage: false;

  saving = false;
  public maxCategoryPictureBytesUserFriendlyValue = 5;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  settings: CropSettings = new CropSettings();
  cropoutpout: CropOutput = new CropOutput();
  public cropevent: EventEmitter<any> = new EventEmitter();
  
  constructor(injector: Injector, public bsModalRef: BsModalRef) {
    super(injector);
    // console.log(this.bsModalRef.content.settings);
    console.log(this.bsModalRef.content);
  }
  ngOnInit(): void {
    console.log('corp model', this.settings);
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = null;
    if (event.target.files[0].size > 5242880) {
      //5MB
      this.message.warn(
        this.l(
          'categoryPicture_Warn_SizeLimit',
          this.maxCategoryPictureBytesUserFriendlyValue
        )
      );
      return;
    }
    console.log('event', event);

    this.imageChangedEvent = event;
    console.log('imgevent', this.imageChangedEvent);
    console.log('croppedimage', this.croppedImage);

  }
  show(): void {
    this.croppedImage = null;
    this.modal.show();
  }
  close(): void {
    this.modalSave.emit(null);
    this.bsModalRef.hide();
  }
  crop(): void {
    console.log('crp', this.settings);
    if (this.settings) {
      this.cropoutpout = {
        module: this.settings.module,
        field: this.settings.field,
        croppedimage: this.croppedImage,
      };
      this.cropevent.emit(this.cropoutpout);
      this.bsModalRef.hide();
    }
  }
  imageCroppedFile(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    // console.log(event, base64ToFile(event.base64));
    //  console.log("Converted Crop Base64", event.base64);
  }
}
