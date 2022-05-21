import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of as _observableOf, throwError as _observableThrow } from 'rxjs';
import { Injectable } from '@angular/core';
import {mergeMap as _observableMergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CategoriesCrudDto } from '../models/categories.models';
import { BuildQueryParams, IPaginatedModel, PaginatedListDto, PagingParams } from '../../../common/shared/models/paginated.models';
export const headers = new HttpHeaders().set("Content-Type", "application/json",);

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private svcUrl = 'Categories';

  constructor(private readonly http: HttpClient) {   }

  Get<T>(prms:PagingParams): Observable<IPaginatedModel<T>> {
    const qryPrms = BuildQueryParams({ ...prms });
    return this.http
        .get<any>(`${environment.base_url}/${this.svcUrl}?${qryPrms}`,{headers})
        .pipe(_observableMergeMap((rs : any) => {
            return _observableOf(PaginatedListDto.fromJS(rs));
        }));
  }

    Update(data: CategoriesCrudDto) : Observable<any>  {;
      return this.http
        .put<any>(`${environment.base_url}/${this.svcUrl}/${data.id}` ,data ,{ headers });
    }

    Create(data: CategoriesCrudDto) : Observable<any>  {
      return this.http
        .post<any>(`${environment.base_url}/${this.svcUrl}` ,data ,{headers});
    }

    delete(id:number): Observable<any> {
      return this.http
        .delete<any>(`${environment.base_url}/${this.svcUrl}/${id}`,{headers});
    }
}
