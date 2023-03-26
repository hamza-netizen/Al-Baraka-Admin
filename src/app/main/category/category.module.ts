import { AdminSharedModule } from './../../admin/shared/admin-shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { CreateOrEditCategoryComponent } from './create-or-edit-category/create-or-edit-category.component';


@NgModule({
  declarations: [
    CategoryComponent,
    CreateOrEditCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    AdminSharedModule
  ]
})
export class CategoryModule { }
