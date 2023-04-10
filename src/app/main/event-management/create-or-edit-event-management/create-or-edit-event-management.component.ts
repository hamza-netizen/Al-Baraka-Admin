import { WeekDayTimingsDto } from './../../../../shared/Interfaces/week-day-timings-dto.model';
import { EventManagementWeekDaysDto } from './../../../../shared/Interfaces/event-management-week-days-dto.model';
import { ICategoryDto, CategoryDto } from '@shared/interfaces/category-dto.model';
import { EventManagementCategoryMappingDto, IEventManagementCategoryMappingDto } from './../../../../shared/Interfaces/event-management-category-mapping-dto.model';
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
import { CategoryService } from '@shared/services/category.service';

export enum WeekDay {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}

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
  category = {} as CategoryDto;
  selectedEventCategory: number[] = [];
  eventCategory: CategoryDto[] = [];
  price: number;
  noOfSeats: number;
  eventBanner: string;
  outputcrop: CropOutput = new CropOutput();
  bsModalRef: BsModalRef;
  categories: ICategoryDto[] = [];
  eventManagementCategoryMapping: EventManagementCategoryMappingDto[]= [];
  weekdays = [];
  selectedWeekDayIds: number[] = [];
  // keys = Object.keys(WeekDay);

  constructor(
    injector: Injector, 
    private _eventManagementService: EventManagementService, 
    private _categoryService: CategoryService,
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
      this.getDays();
      this.getAllCategories();
      this.prepareTranslationModels();
      this.modal.show();
    } 
    else {
      this._eventManagementService.getForEdit(Id).subscribe((result) => {     
      this.eventManagement = result;

      this.eventManagement.startDate = moment(this.eventManagement.startDate,'YYYY-MM-DD' ).toDate();
      this.eventManagement.endDate = moment(this.eventManagement.endDate,'YYYY-MM-DD' ).toDate();

      if(this.eventManagement.eventManagementCategoryMappings){
        this.selectedEventCategory = this.eventManagement.eventManagementCategoryMappings.map(x => x.categoryId); 
      }

      if(this.eventManagement.eventManagementWeekDays){
        this.weekdays = this._eventManagementService.getWeekdays()
      }

      if (this.eventManagement.banner) {
        this.eventBanner = this.eventManagement.folderPath + "/" + this.eventManagement.banner;

      }

      this.getAllCategories();
      this.getDays();
      this.prepareTranslationModels(true);
      this.active = true;
      this.modal.show();
      });
    }
}

  save(Id?: number): void {

    this.eventManagement.startDate.toISOString();
    this.eventManagement.endDate.toISOString();
    this.bindCategory();

    if(!this.eventManagement.id){
      this._eventManagementService
      .addOrEdit(this.eventManagement)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe(() => {  
        this.notify.info(this.l('SavedSuccessfully')); 
        this.close();
      });
    }

    else{
      this._eventManagementService
      .addOrEdit(this.eventManagement)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe(() => {  
        this.notify.info(this.l('SavedSuccessfully')); 
        this.close();
      });
    }
      this.saving = true;
  }

  getAllCategories(){
    this._categoryService.getAllPaged(undefined,undefined,undefined,999).subscribe({
      next: data => {
        this.categories = data.items;
      }
    })
  }

  bindCategory(){
    // this.eventManagement.eventManagementCategoryMappings = [];
    this.selectedEventCategory.forEach(value => {
      let category = new EventManagementCategoryMappingDto();
      category.categoryId = value;
      category.price = this.price;
      category.noOfSeats = this.noOfSeats;
      this.eventManagement.eventManagementCategoryMappings.push(category);
    })
  }

  // addCategory(price: number, noOfSeats: number){

  //   this.selectedEventCategory.forEach(value => {
  //     var eventCategory = new EventManagementCategoryMappingDto();
  //     eventCategory.categoryId = value;
  //     eventCategory.price = price;
  //     eventCategory.noOfSeats = noOfSeats;
  //     this.eventManagement.eventManagementCategoryMappings.push(eventCategory);
  //   })
  // }

  addWeekday(weekdayId: WeekDay, timingId: number): void{
    var newWeekday = new EventManagementWeekDaysDto();
    newWeekday.eventWeekDayId = weekdayId;
    newWeekday.weekDayTimings.find(x => x.eventWeekDayId)[0];
    this.eventManagement.eventManagementWeekDays = [...this.eventManagement.eventManagementWeekDays, newWeekday];
    
  }

  getDays(){
    this.weekdays = this._eventManagementService.getWeekdays().filter(x=>x.name);
  }

  crop(field? :string): void{
    let initialState = null;

    if (field === 'eventBanner'){
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
    
      if (this.outputcrop.field === "eventBanner" ) {
        this.eventBanner = this.eventManagement.banner = this.outputcrop.croppedimage;
      }
      
    });

  }

  deleteImage(field:string){

    if (field === "eventBanner") {
      this.eventBanner = null;

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
    this.eventBanner = null;
    this.isEdit = false;

  }
//#endregion
}

