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
import { ICategoryDto } from '@shared/interfaces/category-dto.model';
import { IEventManagementDto } from '@shared/Interfaces/event-management-dto.model';
import { EventManagementService } from '@shared/services/event-management.service';
import { CreateOrEditEventManagementComponent } from './create-or-edit-event-management/create-or-edit-event-management.component';


@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.css'],
    animations: [appModuleAnimation()],
})
export class EventManagementComponent extends AppComponentBase {

  categoryList: IEventManagementDto[];

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  @ViewChild('createOrEditEventManagement', { static: true }) createOrEditEventManagement: CreateOrEditEventManagementComponent;

  //Filters
  advancedFiltersAreShown = false;
  filterText = '';
  creationDateRange: Date[] = [
    moment().startOf('day').toDate(),
    moment().endOf('day').toDate(),
  ];
  constructor(
    injector: Injector,
    private _eventManagementService: EventManagementService,
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

    this._eventManagementService
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
  
  createEventManagement(): void {
    this.createOrEditEventManagement.showEventManagement();
  }

  view(id: number) {
    this.router.navigate(['main/EventManagement/', id]);
  }

  remove(category: ICategoryDto): void {
    this.message.confirm(
      this.l('categoryDeleteWarningMessage', category.id),
      this.l('AreYouSure'),
      (isConfirmed) => {
        if (isConfirmed) {
          this._eventManagementService.remove(category.id).subscribe(() => {
            this.reloadPage();
            this.notify.success(this.l('SuccessfullyDeleted'));
          });
        }
      }
    );
  }

  exportToExcel(): void {
    // this._CategoryService
    // .getToExcel(
    //     this.filterText,
    //     this.primengTableHelper.getSorting(this.dataTable)
    // )
    // .subscribe((result) => {
    //     this._fileDownloadService.downloadTempFile(result);
    // });
  }
}

