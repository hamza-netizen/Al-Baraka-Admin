import { Component, Injector, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';
import * as moment from 'moment';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { VenueService } from '@shared/services/venue.service';
import { IVenueDto } from '@shared/interfaces/venue-dto.model';
import { CreateOrEditVenueComponent } from './create-or-edit-venue/create-or-edit-venue.component';


@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.css'],
  animations: [appModuleAnimation()],
})
export class VenueComponent extends AppComponentBase {
  @ViewChild('createOrEditVenue', { static: true }) createOrEditVenue: CreateOrEditVenueComponent;

  venueList: IVenueDto[];

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  //Filters
  advancedFiltersAreShown = false;
  filterText = '';
  creationDateRange: Date[] = [
    moment().startOf('day').toDate(),
    moment().endOf('day').toDate(),
  ];
  constructor(
    injector: Injector,
    private venueService: VenueService,
    private _fileDownloadService: FileDownloadService,
    private _activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    super(injector);
    this.filterText = this._activatedRoute.snapshot.queryParams['filterText'] || '';
  }

  ngAfterViewInit(): void {
    this.primengTableHelper.adjustScroll(this.dataTable);
  }

  getall(event?: LazyLoadEvent){
      if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);

      return;
    }

    this.primengTableHelper.showLoadingIndicator();

    this.venueService
      .getAllPaged(
        undefined,
        this.primengTableHelper.getSorting(this.dataTable),
        this.primengTableHelper.getSkipCount(this.paginator, event),
        this.primengTableHelper.getMaxResultCount(this.paginator, event)
      )
      .pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator()))
      .subscribe((result) => {
        this.primengTableHelper.totalRecordsCount = result.totalCount;
        this.primengTableHelper.records = result.items;
        this.primengTableHelper.hideLoadingIndicator();
      });
  }

  reloadPage(): void {
    this.paginator.changePage(this.paginator.getPage())
  }
  
  createVenue(): void {
    this.createOrEditVenue.showVenueModal();
  }

  view(id: number) {
    this.router.navigate(['main/venue/', id]);
  }

  remove(venue: IVenueDto): void {
    this.message.confirm(
      this.l('venueDeleteWarningMessage', venue.id),
      this.l('AreYouSure'),
      (isConfirmed) => {
        if (isConfirmed) {
          this.venueService.remove(venue.id).subscribe(() => {
            this.reloadPage();
            this.notify.success(this.l('SuccessfullyDeleted'));
          });
        }
      }
    );
  }

  exportToExcel(): void {
    // this.venueService
    // .getToExcel(
    //     this.filterText,
    //     this.primengTableHelper.getSorting(this.dataTable)
    // )
    // .subscribe((result) => {
    //     this._fileDownloadService.downloadTempFile(result);
    // });
  }
}

