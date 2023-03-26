import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventManagementComponent } from './event-management.component';

const routes: Routes = [{ path: '', component: EventManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventManagementRoutingModule { }
