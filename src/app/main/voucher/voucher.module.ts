import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoucherRoutingModule } from './voucher-routing.module';
import { VoucherComponent } from './voucher.component';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { CreateOrEditVoucherComponent } from './create-or-edit-voucher/create-or-edit-voucher.component';


@NgModule({
  declarations: [
    VoucherComponent,
    CreateOrEditVoucherComponent
  ],
  imports: [
    CommonModule,
    VoucherRoutingModule,
    AdminSharedModule

  ]
})
export class VoucherModule { }
