import { Component, EventEmitter, Injector, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { IEventManagementDto } from '@shared/Interfaces/event-management-dto.model';
import { IVoucherDto, VoucherDto } from '@shared/interfaces/voucher-dto.model';
import { EventManagementService } from '@shared/services/event-management.service';
import { VoucherService } from '@shared/services/voucher.service';
import * as _ from 'lodash';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'createOrEditVoucher',
  templateUrl: './create-or-edit-voucher.component.html',
  styleUrls: ['./create-or-edit-voucher.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class CreateOrEditVoucherComponent extends AppComponentBase {
  @ViewChild('createOrEditVoucher', { static: true }) modal: ModalDirective;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  active = false;
  saving = false;
  voucher = {} as IVoucherDto;
  eventManagement: IEventManagementDto[] = [];

  constructor(
    injector: Injector, 
    private _voucherService: VoucherService, 
    private _eventManagementService: EventManagementService,
    private router: Router
  ){
      super(injector);
  }

  showVoucherModal(Id?: number): void {  

    this.clear();

    if (!Id) {
      console.log('create');
      this.getAllEventManagement();
      this.active = true;
      this.modal.show();
    } else {
      this._voucherService.getForEdit(Id).subscribe((result) => {     
        this.voucher = result;

        this.getAllEventManagement();
        this.active = true;
        this.modal.show();
      });
    }
  }


save(Id?: number): void {

  this.saving = true;
    console.log('voucher', this.voucher);
    this._voucherService
      .addOrEdit(this.voucher)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe(() => {  
        this.notify.info(this.l('SavedSuccessfully')); 
        this.close();
      });

}

getAllEventManagement() {
  this._eventManagementService.getAllPaged(undefined,undefined,undefined,999).subscribe({
    next: data => {
      this.eventManagement = data.items
    }
  })
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
  this.voucher = new VoucherDto();
}
//#endregion
}

