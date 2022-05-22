import { Component, OnInit } from '@angular/core';
import { pick, findIndex, filter, get, forEach, find } from 'lodash';
import { CategoriesDto } from 'src/app/core/categories/models/categories.models';
import { AppInjector } from 'src/app/services/app-injector.service';
import { ACTION_MSG } from 'src/app/common/constants/constants';
import { PagingParams, PaginatedListDto } from 'src/app/common/shared/models/paginated.models';
import UnSubscribe from '../../utils/unsubscribe';
import { GenericService } from '../../shared/services/general/generic.service';
import { GlobalHttpService } from '../../shared/services/generics/global-http.service';
import { MessagingService } from '../../shared/services/message.service';
import { ProcessDataBy } from '../../utils/data-processing';

type TDto = any;
type TCRUDDto = any;

@Component({template: ''})
export class BasicCRUDComponent extends UnSubscribe implements OnInit  {

    protected msgSvc:MessagingService;
    protected gnrcSvc: GenericService;
    protected globalHttpSvc: GlobalHttpService;
    public categories: CategoriesDto[];
    urlResource = '';
    defaultObj:TDto = {};

    objFilter:any = {
        pagingPrms: {pageNumber : 1, pageSize: 1000} as PagingParams
    };

    objTbl: { [s:string]: any; } = {
        ListPaginated: new PaginatedListDto<TDto>(),
        dataSource: Array<TDto>(),
        totalRecords: 0,
        cols: [],
        filteringOptions: [],
        title:  '',
        showMultiSelectCols : false,
        selectedColumns : [],
        showId: true,
    };

    objMdl: { [s:string] : any } = {
        title: `Create ${this.objTbl.title}`,
        selectedItem: {},
        showDialog: false,
        modalConfig : { width: '750px', height: '200px' },
        mode: false,
    }

    objAccordionConfig: any[] = [];
    gnrlSvcMstrDt: { [s:string]:any } = {};

    constructor() {
        super();
        const injector = AppInjector.getInjector();
        this.gnrcSvc = injector.get(GenericService);
        this.globalHttpSvc = injector.get(GlobalHttpService);
        this.msgSvc = injector.get(MessagingService);
    }

   ngOnInit() {
    // this.getCategoryList();
    this.getLocalList();
   }

  //  getCategoryList() {
  //   this.subSink.sink = this.gnrcSvc.GetCategorias().pipe(take (1)).subscribe({
  //     next: (rslt:any) => {
  //       this.categories = rslt.items;
  //       const rs  = ProcessDataBy.transformKeyArrayDtStruct(get(rslt,['items'],[]), SERVICE_LISTNAMES.CATEROGY.NAME);
  //       // FieldBuilder.arrSvcGeneric = rs;
  //       setTimeout(() => { this.settingUpForm(); }, 500);
  //   }});
  //  }


   getLocalList() {
    this.subSink.sink =  this.globalHttpSvc.GetPaginatedList(this.objFilter.pagingPrms, this.urlResource)
      .subscribe({next: (rs) => {
        this.objTbl.ListPaginated = rs;
        this.objTbl.dataSource = ProcessDataBy.SortItems(pick(rs,'items')['items']);
    }, error: err => {
        this.msgSvc.add( 'error', `Lista ${this.objTbl.title}`,`Error en la operación : ${err}`)
    }});
   }

   onEditItemHandler(e:any) {
    this.objMdl.selectedItem  = null;
    this.objMdl.title = `${get(e,['mode'],'Procesar')} ${this.objTbl.title}`;
    // this.objMdl.form.patchValue({...this.objMdl.selectedItem});
    this.objMdl.mode = !!(get(e,['mode'],'none') === 'Editar');
    this.showDialog(true);
  }

  showDialog(rs:boolean) {
    this.objMdl.showDialog = rs;
  }

  onSaveLocal(e) {
    if(e.form.valid ) {
      const rvwObj = this.getModelAsDto({...e.vm});
      if( this.objMdl.selectedItem.id > 0 ) {
          this.onUpdateItemCntnr(rvwObj);
      }else {
          this.onCreateItemCntnr({...rvwObj, id: 0});
      }
    }
  }

  getModelAsDto(rwVls: TCRUDDto) : TDto{
    return  {
      id: get(this.objMdl.selectedItem,['id'],0),
      nombre: get(rwVls, ['nombre'],'Nombre'),
      idEstatus: get(rwVls.estatus,['id'], 0),
      estatus: get(rwVls.estatus,['nombre'], 'Estatus'),
    } as TDto;
  }

  onUpdateItemCntnr(rvwObj: TDto) {
    this.subSink.sink = this.globalHttpSvc.Update<TDto>(rvwObj, get(rvwObj, ['id'],0), this.urlResource)
      .subscribe({next: rs => {
        this.resetInitialState({...rvwObj },'edit');
        this.msgSvc.add('success', ACTION_MSG.ACTUALIZAR_REG, ACTION_MSG.OP_EXITOSA);
      },
        error: (err) => {
          this.msgSvc.add('error', ACTION_MSG.ACTUALIZAR_REG, `${ACTION_MSG.OP_ERROR} : ${err}`);
      }});
  }

  onCreateItemCntnr(rvwObj: TDto) {
    this.subSink.sink = this.globalHttpSvc.Create<TDto>(rvwObj, this.urlResource)
      .subscribe({next: rs => {
          this.resetInitialState({...rvwObj, id:rs }, 'new');
          this.msgSvc.add('success', ACTION_MSG.CREAR_REG, ACTION_MSG.OP_EXITOSA);
        },
      error: (err) => {
        this.msgSvc.add('error', ACTION_MSG.CREAR_REG, `${ACTION_MSG.OP_ERROR} : ${err}`);
    }});
  }

  resetInitialState(dt:TDto, mode:string) {
    switch (mode) {
      case 'new':
        this.objTbl.dataSource.unshift({...dt });
        break;
      case 'edit':
        const indx = findIndex(this.objTbl.dataSource, ['id', dt.id]);
        this.objTbl.dataSource[indx] = dt;
        break;
      default:
        this.objTbl.dataSource = filter(this.objTbl.dataSource,i => (i.id !== dt.id));
        break;
    }
    this.resetModalObj();
  }

  resetModalObj () {
    this.objMdl.form.reset();
    this.showDialog(false);
    this.objMdl.selectedItem = {...this.defaultObj};
  }
}
