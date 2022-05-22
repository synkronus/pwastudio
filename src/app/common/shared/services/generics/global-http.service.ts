import { Observable, of as _observableOf, throwError as _observableThrow } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {mergeMap as _observableMergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Inject, Injectable, Optional } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { GenericFilterResponse } from '../../models/common.models';
import { PagingParams, IPaginatedModel, BuildQueryParams, PaginatedListDto } from '../../models/paginated.models';

export const headers = new HttpHeaders().set("Content-Type", "application/json",);
@Injectable({providedIn: 'any'})
export class GlobalHttpService  {

  constructor( private http: HttpClient,
      @Inject('urlPath') @Optional() public urlPath?: string ) { }

    Get(urlPath: string): Observable<any> {
        return this.http
            .get<any>(`${environment.base_url}/${urlPath}`,{headers});
    }

    GetCustomQryList<TDto>(payload: LazyLoadEvent, urlPath: string): Observable<GenericFilterResponse<TDto[]>> {
      return this.http
          .post<any>(`${environment.base_url}/${urlPath}/qry`, payload, {headers})
    }

    GetPaginatedList<TDto>(prms:PagingParams, urlPath: string): Observable<IPaginatedModel<TDto>> {
      const qryPrms = BuildQueryParams({ ...prms });
      return this.http
          .get<any>(`${environment.base_url}/${urlPath}?${qryPrms}`,{headers})
          .pipe(_observableMergeMap((rs : any) => { return _observableOf(PaginatedListDto.fromJS(rs)); }));
    }

    GetPaginatedListArryLsit<TDto>(prms:PagingParams, urlPath: string): Observable<IPaginatedModel<TDto>> {
      const qryPrms = BuildQueryParams({ ...prms });
      return this.http.get<any>(`${environment.base_url}/${urlPath}?${qryPrms}`,{headers});
    }

    Update<TDto>(data: TDto, id:number, urlPath: string) : Observable<any>  {;
      return this.http
        .put<any>(`${environment.base_url}/${urlPath}/${id}` ,data ,{ headers });
    }

    Create<TDto>(data: TDto, urlPath: string) : Observable<any>  {
      return this.http
        .post<any>(`${environment.base_url}/${urlPath}` ,data ,{headers});
    }

    delete(id:number, urlPath: string): Observable<any> {
      return this.http
        .delete<any>(`${environment.base_url}/${urlPath}/${id}`,{headers});
    }

}
