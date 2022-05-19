import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryItemCrudDto, CategoryItemsDto } from '../models/categories.models';
export const headers = new HttpHeaders().set("Content-Type", "application/json",);

@Injectable({
  providedIn: 'root'
})
export class CategoryItemsService {

  private svcUrl = 'CategoryItems';

  constructor(private readonly http: HttpClient) {   }

  Get(): Observable<CategoryItemsDto[]> { 
      return this.http
          .get<any>(`${environment.base_url}/${this.svcUrl}`,{headers});
  }
  UpdateItem(data: CategoryItemCrudDto) : Observable<any>  {;
    return this.http
      .put<any>(`${environment.base_url}/${this.svcUrl}/${data.id}` ,data ,{ headers });
  }

  CreateItem(data: CategoryItemCrudDto) : Observable<any>  {
    return this.http
      .post<any>(`${environment.base_url}/${this.svcUrl}` ,data ,{headers});
  }

  delete(id:number): Observable<any> { 
    return this.http
      .delete<any>(`${environment.base_url}/${this.svcUrl}/${id}`,{headers});
  }
}
