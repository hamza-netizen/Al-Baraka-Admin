import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoxOfficeRoutingModule } from './box-office-routing.module';
import { BoxOfficeComponent } from './box-office.component';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';


@NgModule({
  declarations: [
    BoxOfficeComponent
  ],
  imports: [
    CommonModule,
    BoxOfficeRoutingModule,
    AdminSharedModule

  ]
})
export class BoxOfficeModule { }
