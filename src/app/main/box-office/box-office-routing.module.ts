import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoxOfficeComponent } from './box-office.component';

const routes: Routes = [{ path: '', component: BoxOfficeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoxOfficeRoutingModule { }
