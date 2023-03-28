import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoucherRoutingModule } from './voucher-routing.module';
import { VoucherComponent } from './voucher.component';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';


@NgModule({
  declarations: [
    VoucherComponent
  ],
  imports: [
    CommonModule,
    VoucherRoutingModule,
    AdminSharedModule

  ]
})
export class VoucherModule { }
