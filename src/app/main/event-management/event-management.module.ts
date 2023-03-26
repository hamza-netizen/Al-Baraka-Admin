import { AdminSharedModule } from './../../admin/shared/admin-shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventManagementRoutingModule } from './event-management-routing.module';
import { EventManagementComponent } from './event-management.component';
import { CreateOrEditEventManagementComponent } from './create-or-edit-event-management/create-or-edit-event-management.component';


@NgModule({
  declarations: [
    EventManagementComponent,
    CreateOrEditEventManagementComponent
  ],
  imports: [
    CommonModule,
    EventManagementRoutingModule,
    AdminSharedModule
  ]
})
export class EventManagementModule { }
