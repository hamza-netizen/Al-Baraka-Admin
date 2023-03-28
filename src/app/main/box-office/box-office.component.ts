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
import { BoxOfficeService } from '@shared/services/box-office.service';
import { IBoxOfficeDto } from '@shared/interfaces/box-office-dto.model';
// import { CreateOrEditBoxOfficeComponent } from './create-or-edit-boxOffice/create-or-edit-boxOffice.component';


@Component({
  selector: 'app-box-office',
  templateUrl: './box-office.component.html',
  styleUrls: ['./box-office.component.css'],
  animations: [appModuleAnimation()],
})

export class BoxOfficeComponent extends AppComponentBase {
  // @ViewChild('createOrEditBoxOffice', { static: true }) createOrEditBoxOffice: CreateOrEditBoxOfficeComponent;

  boxOfficeList: IBoxOfficeDto[];

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
    private _boxOfficeService: BoxOfficeService,
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

    this._boxOfficeService
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
  
  createBoxOffice(): void {
    // this.createOrEditBoxOffice.showBoxOfficeModal();
  }

  view(id: number) {
    this.router.navigate(['main/box-office/', id]);
  }

  remove(boxOffice: IBoxOfficeDto): void {
    this.message.confirm(
      this.l('boxOfficeDeleteWarningMessage', boxOffice.id),
      this.l('AreYouSure'),
      (isConfirmed) => {
        if (isConfirmed) {
          this._boxOfficeService.remove(boxOffice.id).subscribe(() => {
            this.reloadPage();
            this.notify.success(this.l('SuccessfullyDeleted'));
          });
        }
      }
    );
  }

  exportToExcel(): void {
    // this._boxOfficeService
    // .getToExcel(
    //     this.filterText,
    //     this.primengTableHelper.getSorting(this.dataTable)
    // )
    // .subscribe((result) => {
    //     this._fileDownloadService.downloadTempFile(result);
    // });
  }
}

