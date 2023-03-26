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
import { CategoryService } from '@shared/services/category.service';
import { ICategoryDto } from '@shared/interfaces/category-dto.model';
import { CreateOrEditCategoryComponent } from './create-or-edit-category/create-or-edit-category.component';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
    animations: [appModuleAnimation()],
})
export class CategoryComponent extends AppComponentBase {
  @ViewChild('createOrEditCategory', { static: true }) createOrEditCategory: CreateOrEditCategoryComponent;

  categoryList: ICategoryDto[];

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
    private _CategoryService: CategoryService,
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

    this._CategoryService
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
  
  createCategory(): void {
    this.createOrEditCategory.showCategoryModal();
  }

  view(id: number) {
    this.router.navigate(['main/category/', id]);
  }

  remove(category: ICategoryDto): void {
    this.message.confirm(
      this.l('categoryDeleteWarningMessage', category.id),
      this.l('AreYouSure'),
      (isConfirmed) => {
        if (isConfirmed) {
          this._CategoryService.remove(category.id).subscribe(() => {
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

