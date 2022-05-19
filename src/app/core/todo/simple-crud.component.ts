import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PaginatedListDto } from '../../shared/models/paginated.models';
import { BasicCRUDComponent } from '../../shared/base/basic-crud';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { defaultRoutesObj, FieldsCfg, RoutesDto, TableColumnDefinitions,
              TablefilterOptions } from './models/simple.models';

type TDto = RoutesDto;
@Component({
  selector: 'app-simple-crud',
  templateUrl: './simple-crud.component.html',
  styleUrls: ['./simple-crud.component.scss']
})
export class SimpleCrudComponent extends BasicCRUDComponent implements OnInit  {

  urlResource = 'simpleCrud';
  defaultObj:TDto = {...defaultRoutesObj};
  fields: FormlyFieldConfig[] = [];

  objTbl: { [s:string]: any; } = {
      ListPaginated: new PaginatedListDto<TDto>(),
      dataSource: Array<TDto>(),
      totalRecords: 0,
      cols: [...TableColumnDefinitions],
      filteringOptions: [...TablefilterOptions],
      title:  'Simple-CRUD',
      showMultiSelectCols : false,
      selectedColumns : [],
      showId: true
  };

  objMdl: { [s:string] : any } = {
      title: `Create ${this.objTbl.title}`,
      fields : Array<FormlyFieldConfig>(),
      form: FormGroup,
      selectedItem: {...this.defaultObj},
      showDialog: false,
      modalConfig : { width: '750px', height: '400px' }
  }

  constructor() {
      super();
  }

  ngOnInit() {
    this.objMdl['fields'] = [...FieldsCfg];
    this.getLocalList();
   }

}




