import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoxOfficeRoutingModule } from './box-office-routing.module';
import { BoxOfficeComponent } from './box-office.component';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { CreateOrEditBoxOfficeComponent } from './create-or-edit-box-office/create-or-edit-box-office.component';


@NgModule({
  declarations: [
    BoxOfficeComponent,
    CreateOrEditBoxOfficeComponent
  ],
  imports: [
    CommonModule,
    BoxOfficeRoutingModule,
    AdminSharedModule

  ]
})
export class BoxOfficeModule { }
