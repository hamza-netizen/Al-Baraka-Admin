import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VenueRoutingModule } from './venue-routing.module';
import { VenueComponent } from './venue.component';
import { CreateOrEditVenueComponent } from './create-or-edit-venue/create-or-edit-venue.component';


@NgModule({
  declarations: [
    VenueComponent,
    CreateOrEditVenueComponent
  ],
  imports: [
    CommonModule,
    VenueRoutingModule,
    AdminSharedModule
  ]
})
export class VenueModule { }
