import { mergeMap as _observableMergeMap, catchError as _observableCatch, map } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

import { AppConsts } from '@shared/AppConsts';
import { IBoxOfficeDto } from '@shared/interfaces/box-office-dto.model';
import { IRootObjectDto } from '@shared/interfaces/root-object-dto.model';
import { IResultDto } from '@shared/interfaces/result-dto.model';


@Injectable({  
  providedIn: 'root'
})


export class BoxOfficeService {
  private http: HttpClient;
  private baseUrl: string;

  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.http = http;
    this.baseUrl = AppConsts.remoteServiceBaseUrl;
    console.log(baseUrl);
  
  }
  
  getAllPaged(MasterFilter?: string | undefined,  sorting?: string | null | undefined, skipCount?: number | undefined, maxResultCount?: number | undefined): Observable<IResultDto<IBoxOfficeDto>> 
  {
    let url_ =  '/api/services/app/BoxOffice/GetAllPaged?';

        if (MasterFilter === null)
          throw new Error("The parameter 'MasterFilter' cannot be null.");

        else if (MasterFilter !== undefined)
          url_ += 'MasterFilter=' + encodeURIComponent('' + MasterFilter) + '&';
          
        // if (isPublished === null)
        //   throw new Error("The parameter 'isPublished' cannot be null.");
    
        // else if (isPublished !== undefined)
        //   url_ += 'isPublished=' + encodeURIComponent('' + isPublished) + '&';
    
        else  if (sorting !== undefined) {
            url_ += 'Sorting=' + encodeURIComponent('' + sorting) + '&';    
        }
        
        if (skipCount === null)
          throw new Error("The parameter 'skipCount' cannot be null.");
        else if (skipCount !== undefined)
          url_ += 'SkipCount=' + encodeURIComponent('' + skipCount) + '&';
    
        if (maxResultCount === null)
          throw new Error("The parameter 'maxResultCount' cannot be null.");
        else if (maxResultCount !== undefined)
          url_ += 'MaxResultCount=' + encodeURIComponent('' + maxResultCount) + '&';
    
        url_ = url_.replace(/[?&]$/, '');

    return this.http.get<IRootObjectDto<IBoxOfficeDto>>(url_).pipe(map(x=>x.result));
  }

  getForEdit(Id: number | undefined): Observable<IBoxOfficeDto> {


    let url_ =  '/api/services/app/BoxOffice/GetForEdit?';
        if (Id === null) throw new Error("The parameter 'id' cannot be null.");
        else if (Id !== undefined)
          url_ += 'Id=' + encodeURIComponent('' + Id) + '&';
        url_ = url_.replace(/[?&]$/, '');

        return this.http.get<IResultDto<IBoxOfficeDto>>(url_).pipe(map(result => result.result));
        
  }

  addOrEdit(body: IBoxOfficeDto | undefined): Observable<IBoxOfficeDto> {

    console.log(body);
    let url_ =  '/api/services/app/BoxOffice/AddOrEdit';
    url_ = url_.replace(/[?&]$/, '');

    
    const headers = { 'content-type': 'application/json'}  
    const jsonBody=JSON.stringify(body);
    //console.log(jsonBody)

    return this.http.post<IBoxOfficeDto>(url_, jsonBody,{'headers':headers})
  }

  remove(id: number | undefined): Observable<void> {
    let url_ =  "/api/services/app/BoxOffice/Remove?";
          if (id === null)
              throw new Error("The parameter 'id' cannot be null.");
          else if (id !== undefined)
              url_ += "Id=" + encodeURIComponent("" + id) + "&"; 
          url_ = url_.replace(/[?&]$/, "");

          return this.http.delete<void>(url_);
  }

//   getToExcel(filter: string, sorting: string | undefined): Observable<FileDto> {
//     let url_ =  "/api/services/app/BoxOffice/GetCountriesToExcel?";
//     if (filter === null)
//         throw new Error("The parameter 'filter' cannot be null.");
//     else if (filter !== undefined)
//         url_ += "Filter=" + encodeURIComponent("" + filter) + "&";     
//     else if (sorting !== undefined)
//         url_ += "Sorting=" + encodeURIComponent("" + sorting) + "&";
//     url_ = url_.replace(/[?&]$/, "");

//     return this.http.get<FileDto>(url_).pipe(map(result => result));
// }

}