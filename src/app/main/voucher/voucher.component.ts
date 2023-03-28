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
import { VoucherService } from '@shared/services/voucher.service';
import { IVoucherDto } from '@shared/interfaces/voucher-dto.model';
// import { CreateOrEditVoucherComponent } from './create-or-edit-voucher/create-or-edit-voucher.component';


@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css'],
    animations: [appModuleAnimation()],
})
export class VoucherComponent extends AppComponentBase {
  // @ViewChild('createOrEditvoucher', { static: true }) createOrEditvoucher: CreateOrEditVoucherComponent;

  voucherList: IVoucherDto[];

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
    private _voucherService: VoucherService,
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

    this._voucherService
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
  
  createVoucher(): void {
    // this.createOrEditVoucher.showvoucherModal();
  }

  view(id: number) {
    this.router.navigate(['main/voucher/', id]);
  }

  remove(voucher: IVoucherDto): void {
    this.message.confirm(
      this.l('voucherDeleteWarningMessage', voucher.id),
      this.l('AreYouSure'),
      (isConfirmed) => {
        if (isConfirmed) {
          this._voucherService.remove(voucher.id).subscribe(() => {
            this.reloadPage();
            this.notify.success(this.l('SuccessfullyDeleted'));
          });
        }
      }
    );
  }

  exportToExcel(): void {
    // this._voucherService
    // .getToExcel(
    //     this.filterText,
    //     this.primengTableHelper.getSorting(this.dataTable)
    // )
    // .subscribe((result) => {
    //     this._fileDownloadService.downloadTempFile(result);
    // });
  }
}

