import { EventManagementDto, IEventManagementDto } from '@shared/Interfaces/event-management-dto.model';
import { Component, EventEmitter, Injector, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TranslationEditDto } from '@shared/interfaces/translation-edit-dto.model';
import { MultiLingualModelService } from '@shared/translation-editor/multi-lingual-model.service';
import * as _ from 'lodash';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { EventManagementService } from '@shared/services/event-management.service';

@Component({
  selector: 'createOrEditEventManagement',
  templateUrl: './create-or-edit-event-management.component.html',
  styleUrls: ['./create-or-edit-event-management.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class CreateOrEditEventManagementComponent extends AppComponentBase {
  @ViewChild('createOrEditEventManagement', { static: true }) modal: ModalDirective;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  active = false;
  saving = false;
  eventManagement = {} as IEventManagementDto;

  constructor(
    injector: Injector, 
    private _eventManagementService: EventManagementService, 
    private _multiLingualModelService: MultiLingualModelService,
    private router: Router
  ){
      super(injector);
  }

  showEventManagement(Id?: number): void {   
  if (!Id) {
    console.log('create');
    this.clear();
    this.active = true;
    this.prepareTranslationModels();
    this.modal.show();
  } else {
    this._eventManagementService.getForEdit(Id).subscribe((result) => {     
      this.eventManagement = result;
      if (Id) {
        this.active = true;
        this.prepareTranslationModels(true);
      }
      this.modal.show();
    });
  }
}

  prepareTranslationModels(editMode = false): void {
  if (!editMode) {
    this.eventManagement.translations = this._multiLingualModelService.prepareTranslationModels(
      TranslationEditDto
    );
  }

  const translationConfigurer = (translation: TranslationEditDto) => {

    let existingTranslation = _.find(
      this.eventManagement.translations,
      (x) => x.language === translation.language
    );

    if (existingTranslation) {
      translation.name = existingTranslation.name;
    }
    return translation;
  };

  this.eventManagement.translations = this._multiLingualModelService.prepareTranslationModels(
    TranslationEditDto,
    translationConfigurer
  );
}

save(Id?: number): void {

  this.saving = true;
    console.log('eventManagement', this.eventManagement);
    this._eventManagementService
      .addOrEdit(this.eventManagement)
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
  this.eventManagement = new EventManagementDto();
}
//#endregion
}

