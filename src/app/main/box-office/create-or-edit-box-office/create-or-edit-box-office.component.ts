import { Component, EventEmitter, Injector, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { IBoxOfficeDto, BoxOfficeDto } from '@shared/interfaces/box-office-dto.model';
import * as _ from 'lodash';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { BoxOfficeService } from '@shared/services/box-office.service';

@Component({
  selector: 'createOrEditBoxOffice',
  templateUrl: './create-or-edit-box-office.component.html',
  styleUrls: ['./create-or-edit-box-office.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class CreateOrEditBoxOfficeComponent extends AppComponentBase {

  @ViewChild('createOrEditBoxOffice', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;
  isEdit = false;
  boxOffice = {} as IBoxOfficeDto;

  constructor(
    injector: Injector, 
    private _boxOfficeService: BoxOfficeService, 
    private router: Router
  ){
      super(injector);
  }

  showBoxOfficeModal(Id?: number): void {   

    this.isEdit = true;
    if (!Id) {
      console.log('create');
      this.clear();
      this.active = true;
      this.modal.show();
    } else {
      this._boxOfficeService.getForEdit(Id).subscribe((result) => {     
        this.boxOffice = result;
        this.active = true;
        this.modal.show();
      });
    }
}

save(Id?: number): void {

  this.saving = true;
    console.log('boxOffice', this.boxOffice);
    this._boxOfficeService
      .addOrEdit(this.boxOffice)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe(() => {  
        this.notify.info(this.l('SavedSuccessfully')); 
        this.close();
      });

}

close(): void {
  this.active = false;
  this.modalSave.emit(null);
  this.modal.hide();
}

reloadPage(): void {
  window.location.reload();
}

clear(){
  this.boxOffice = new BoxOfficeDto();
}
//#endregion
}

