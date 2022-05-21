import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ObservableStore } from '@codewithdan/observable-store';
import { Categorias, Provincias } from '../../shared/models/generic.models';
import { GenericDataState, GenericDataActions } from 'src/app/common/app-state/store-states';

export const headers = new HttpHeaders().set("Content-Type", "application/json",);

@Injectable({
  providedIn: 'root'
})
export class GenericService extends ObservableStore<GenericDataState> {


  constructor(private readonly http: HttpClient) {
    super({ stateSliceSelector: (state) => {return {
      Provincias: state !== null ? state.Provincias : [],
      Categorias: state !== null ? state.Categorias : [],
    }}});
    this.initDataStore({Provincias:[], Categorias: []});
  }

    GetProvincias(): Observable<Provincias[]> {
       if(this.getState().Provincias.length > 0) return of(this.getState().Provincias);
        return this.http
            .get<any>(`${environment.base_url}/provincias`,{headers})
            .pipe(tap((rs) => this.SetDataState('Provincias', rs, 'GetProvincias')));
    }

    GetCategorias(): Observable<Categorias[]> { //TODO: check cache.
       if(this.getState().Categorias.length > 0) return of(this.GetDataState('Categorias'));
        return this.http
            .get<any>(`${environment.base_url}/Categories`,{headers})
            .pipe(tap((rs) => this.SetDataState('Categorias', rs, 'GetCategorias')));
    }

//#region   *** Store ***

    SetDataState(op, dt:any, wh): any {
      switch (op) {
        case "Provincias":
          this.setState({ Provincias: dt }, `${GenericDataActions.Set}~${wh}`);
          break;
        case "Categorias":
          this.setState({ Categorias: dt }, `${GenericDataActions.Set}~${wh}`);
          break;
      }
    }

    GetDataState(op): any {
      switch (op) {
        case "Provincias": return this.getState().Provincias;
        case "Categorias": return this.getState().Categorias;
      }
    }

    private initDataStore(dt): void {
        this.setState({...dt }, `${GenericDataActions.Set}~initObjMstrDt`);
    }

//#endregion


}
