import { IVenueDto, VenueDto } from './../../../../shared/Interfaces/venue-dto.model';
import { CategoryDto } from './../../../../shared/Interfaces/category-dto.model';
import { Component, EventEmitter, Injector, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ICategoryDto } from '@shared/interfaces/category-dto.model';
import { TranslationEditDto } from '@shared/interfaces/translation-edit-dto.model';
import { CategoryService } from '@shared/services/category.service';
import { MultiLingualModelService } from '@shared/translation-editor/multi-lingual-model.service';
import * as _ from 'lodash';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { VenueService } from '@shared/services/venue.service';

@Component({
  selector: 'createOrEditCategory',
  templateUrl: './create-or-edit-category.component.html',
  styleUrls: ['./create-or-edit-category.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class CreateOrEditCategoryComponent extends AppComponentBase {
  @ViewChild('createOrEditCategory', { static: true }) modal: ModalDirective;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  active = false;
  saving = false;
  venues : IVenueDto[] = [];
  selectedVenue: number[] = [];
  category = {} as ICategoryDto;


  constructor(
    injector: Injector, 
    private _categoryService: CategoryService, 
    private _multiLingualModelService: MultiLingualModelService,
    private _venueService: VenueService,
    private router: Router
  ){
      super(injector);
  }

  showCategoryModal(Id?: number): void {   

    if (!Id) {
      console.log('create');
      this.clear();
      this.active = true;
      this.getAllVenues();
      this.prepareTranslationModels();
      this.modal.show();
    } else {
      this._categoryService.getForEdit(Id).subscribe((result) => {     
        this.category = result;

     

        this.active = true;
        this.getAllVenues();
        this.prepareTranslationModels(true);
        this.modal.show();
      });
    }
  }

  getAllVenues(){
    this._venueService.getAllPaged(undefined,undefined,undefined,999).subscribe({
      next: data => {
        this.venues = data.items
      } 
    })
  }

  prepareTranslationModels(editMode = false): void {
  if (!editMode) {
    this.category.translations = this._multiLingualModelService.prepareTranslationModels(
      TranslationEditDto
    );
  }

  const translationConfigurer = (translation: TranslationEditDto) => {

    let existingTranslation = _.find(
      this.category.translations,
      (x) => x.language === translation.language
    );

    if (existingTranslation) {
      translation.name = existingTranslation.name;
    }
    return translation;
  };

  this.category.translations = this._multiLingualModelService.prepareTranslationModels(
    TranslationEditDto,
    translationConfigurer
  );
}

save(Id?: number): void {

  this.saving = true;
    console.log('category', this.category);
    this._categoryService
      .addOrEdit(this.category)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe(() => {  
        this.notify.info(this.l('SavedSuccessfully')); 
        this.close();
      });

  //   if(this.category.eventCategoryMappings){
  //     this.category.eventCategoryMappings.forEach(eventCategory => {
  //       eventCategory.categoryId = this.category.id;
  //       this.category.eventCategoryMappings.push(eventCategory);
  //   });
  // }
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
  this.category = new CategoryDto();
}
//#endregion
}

