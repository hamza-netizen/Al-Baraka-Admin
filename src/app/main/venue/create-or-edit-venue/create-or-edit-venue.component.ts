import { Component, EventEmitter, Injector, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { IVenueDto, VenueDto } from '@shared/interfaces/venue-dto.model';
import { TranslationEditDto } from '@shared/interfaces/translation-edit-dto.model';
import { VenueService } from '@shared/services/venue.service';
import { MultiLingualModelService } from '@shared/translation-editor/multi-lingual-model.service';
import * as _ from 'lodash';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'createOrEditVenue',
  templateUrl: './create-or-edit-venue.component.html',
  styleUrls: ['./create-or-edit-venue.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class CreateOrEditVenueComponent extends AppComponentBase {
  @ViewChild('createOrEditVenue', { static: true }) modal: ModalDirective;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  active = false;
  saving = false;
  venue = {} as IVenueDto;

  constructor(
    injector: Injector, 
    private _venueService: VenueService, 
    private _multiLingualModelService: MultiLingualModelService,
    private router: Router
  ){
      super(injector);
  }

  showVenueModal(Id?: number): void {   
  if (!Id) {
    console.log('create');
    this.clear();
    this.active = true;
    this.prepareTranslationModels();
    this.modal.show();
  } else {
    this._venueService.getForEdit(Id).subscribe((result) => {     
      this.venue = result;
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
    this.venue.translations = this._multiLingualModelService.prepareTranslationModels(
      TranslationEditDto
    );
  }

  const translationConfigurer = (translation: TranslationEditDto) => {

    let existingTranslation = _.find(
      this.venue.translations,
      (x) => x.language === translation.language
    );

    if (existingTranslation) {
      translation.name = existingTranslation.name;
    }
    return translation;
  };

  this.venue.translations = this._multiLingualModelService.prepareTranslationModels(
    TranslationEditDto,
    translationConfigurer
  );
}

save(Id?: number): void {

  this.saving = true;
    console.log('venue', this.venue);
    this._venueService
      .addOrEdit(this.venue)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe(() => {  
        this.notify.info(this.l('SavedSuccessfully')); 
        this.close();
      });

  //   if(this.venue.eventvenueMappings){
  //     this.venue.eventvenueMappings.forEach(eventvenue => {
  //       eventvenue.venueId = this.venue.id;
  //       this.venue.eventvenueMappings.push(eventvenue);
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
  this.venue = new VenueDto();
}
//#endregion
}

