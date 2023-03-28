import { EventManagementCategoryMappingDto } from './../../../../shared/Interfaces/event-management-category-mapping-dto.model';
import { CategoryDto } from './../../../../shared/Interfaces/category-dto.model';
import { EventManagementDto, IEventManagementDto } from '@shared/Interfaces/event-management-dto.model';
import { Component, EventEmitter, Injector, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TranslationEditDto } from '@shared/interfaces/translation-edit-dto.model';
import { MultiLingualModelService } from '@shared/translation-editor/multi-lingual-model.service';
import * as _ from 'lodash';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { EventManagementService } from '@shared/services/event-management.service';
import { CropOutput } from '@shared/Interfaces/crop-settings-dto.model';
import { CropImageComponent } from '@shared/crop-image/crop-image.component';
import { CropSettingService } from '@shared/services/crop-setting.service';
import * as moment from 'moment';

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
  isEdit = false;
  loading = true;
  showDetails = false;

  eventManagement = {} as IEventManagementDto;
  selectedEventCategory: number[] = [];
  eventCategory: CategoryDto[] = [];
  price: number;
  banner: string;
  outputcrop: CropOutput = new CropOutput();
  bsModalRef: BsModalRef;


  constructor(
    injector: Injector, 
    private _eventManagementService: EventManagementService, 
    private _multiLingualModelService: MultiLingualModelService,
    private _cropSetting: CropSettingService,
    private _bsModalService: BsModalService,
    private router: Router
  ){
      super(injector);
  }

  showEventManagement(Id?: number): void { 
    
    this.isEdit = true;
    if (!Id) {
      console.log('create');
      this.clear();
      this.active = true;
      this.prepareTranslationModels();
      this.modal.show();
    } 
    else {
      this._eventManagementService.getForEdit(Id).subscribe((result) => {     
        this.eventManagement = result;

        this.eventManagement.startDate = moment(this.eventManagement.startDate,'YYYY-MM-DD' ).toDate();
        this.eventManagement.endDate = moment(this.eventManagement.endDate,'YYYY-MM-DD' ).toDate();

        this.active = true;
        this.prepareTranslationModels(true);
        this.modal.show();
      });
    }
}

  save(Id?: number): void {

    this.eventManagement.startDate.toISOString();
    this.eventManagement.endDate.toISOString();

    this._eventManagementService
      .addOrEdit(this.eventManagement)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe(() => {  
        this.notify.info(this.l('SavedSuccessfully')); 
        this.close();
      });
    
      // if(this.eventManagement.eventManagementCategoryMappings){
      //   this.eventManagement.eventManagementCategoryMappings.forEach(event =>{
      //     event.price = this.price
      //   })
      // }
      this.saving = true;
  }

  bindCategory(event:any){

    this.selectedEventCategory.forEach(value =>{
      let category = new EventManagementCategoryMappingDto();
      category.id = value; 
      this.eventManagement.eventManagementCategoryMappings.push(category);
  });
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



crop(field? :string): void{
  let initialState = null;

  if (field === 'eventbanner'){
    initialState = {
      settings: this._cropSetting.setEventBanner()
    };
  }

  this.bsModalRef = this._bsModalService.show(CropImageComponent, {
    initialState,
    class: 'modal-lg mt-9'
  });
  this.bsModalRef.content.cropevent.subscribe((result) => {
    this.outputcrop = result;
  
    if (this.outputcrop.field === "eventbanner" ) {
      this.banner = this.eventManagement.banner = this.outputcrop.croppedimage;
    }
    
  });

}

deleteImage(field:string){

  if (field === "eventbanner") {
    this.banner = null;

  }
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
  this.banner = null;
  this.eventManagement = new EventManagementDto();
}
//#endregion
}

