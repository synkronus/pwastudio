import { TranslateService } from '@ngx-translate/core';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfirmationService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { SubSink } from "subsink";
import { PaginatedListDto, PagingParams } from "../../shared/models/paginated.models";
import { MessagingService } from "../../modules/services/message.service";
import { CategoryItemsComponent } from "./category-items/category-items.component";
import { CategoriesCrudDto, CategoriesDto, CategoryDataMdl, Statuses } from "./models/categories.models";
import { CategoriesService } from "./services/categories.service";
import { pick, findIndex, filter, orderBy } from 'lodash';
import { ACTION_MSG } from "../../shared/constants/constants";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
})
export class CategoriesComponent implements OnInit, OnDestroy {

  private subSink = new SubSink();
  ref: DynamicDialogRef;
  @ViewChild('inputBar') inputBar;
  objFilter:any = { pagingPrms: {pageNumber : 1, pageSize: 500} as PagingParams};
  objMdl: { [s:string] : any } = { form: FormGroup, selectedItem: {id:0, nombre:'', descripcion: '', estado:0}, showDialog:false };

  objGrl: { [s: string]: any } = {
    title: "Categorias",
    newItem: false,
    mdlTitle: '',
    slctdCategory: CategoriesDto,
    ListPaginated: new PaginatedListDto<CategoriesDto>(),
    List: Array<CategoriesDto>(),
    filteringOptions: ["id", "nombre", "descripcion"],
    statuses: Statuses
  };

  constructor(
    private categoriesSvc: CategoriesService, private dialogSvc:DialogService,
    private msgSvc: MessagingService, private confirmPopUpSvc: ConfirmationService,
    private fb: FormBuilder, private refChanged: ChangeDetectorRef,
    private translate: TranslateService) {}

  ngOnInit() {
    this.getList();
    this.objMdl.form = this.fb.group({
      id : [{value: 0 , disabled:true}],
      nombre : ['', Validators.required],
      descripcion : ['', Validators.required],
      estado : this.objGrl.statuses[0].value
    });
  }

  getList() {
    this.subSink.sink =  this.categoriesSvc.Get<CategoriesDto>(this.objFilter.pagingPrms).subscribe({next: (rs) => {
        this.objGrl.ListPaginated = rs;
        this.objGrl.List = this.sortItems(pick(rs,'items')['items']);
    }, error: err => {
        this.msgSvc.add( 'error', ACTION_MSG.LISTAR_REG,`${ACTION_MSG.OP_ERROR} : ${err}`)
    }});
  }

  showMdlHandler(row:any, mode:string) {
    this.objGrl.mdlTitle =  (mode === 'edit') ? 'Editar': 'Crear';
    this.objGrl.mdlTitle = this.objGrl.mdlTitle + ' categoria';
    this.objMdl.selectedItem = (mode === 'edit') ? row : {id:0, nombre:'', descripcion: '', estado:1} as any;
    this.objMdl.form.patchValue({ id : this.objMdl.selectedItem.id, nombre : this.objMdl.selectedItem.nombre, descripcion : this.objMdl.selectedItem.descripcion, estado: this.objGrl.statuses.find(x => x.value === this.objMdl.selectedItem.estado).value});
    this.showDialog(true);
  }

  saveData() {
    if (this.objMdl.form.valid) {
      const rwVls = { ...this.objMdl.form.value } as any;
      const rvwObj = {
        id: this.objMdl.selectedItem.id,
        nombre: rwVls.nombre,
        descripcion: rwVls.descripcion,
        estado: rwVls.estado ? 1 : 0
      } as CategoriesCrudDto;
      if (this.objMdl.selectedItem.id > 0) {
        this.onUpdateItem(rvwObj);
      } else {
        this.onCreateItem({ ...rvwObj, id: 0 });
      }
    }
  }

  onUpdateItem(rvwObj: CategoriesCrudDto) {
    this.subSink.sink = this.categoriesSvc.Update(rvwObj).subscribe({
      next: rs => {
        this.getList();
        this.showDialog(false);
        this.msgSvc.add('success', ACTION_MSG.ACTUALIZAR_REG, ACTION_MSG.OP_EXITOSA);
      },
      error: (err) => {
        this.msgSvc.add('error', ACTION_MSG.ACTUALIZAR_REG, `${ACTION_MSG.OP_ERROR} : ${err}`);
      }
    });
  }

  onCreateItem(rvwObj: CategoriesCrudDto) {
    this.subSink.sink = this.categoriesSvc.Create(rvwObj).subscribe({
      next: rs => {
        this.getList();
        this.showDialog(false);
        this.msgSvc.add('success', ACTION_MSG.CREAR_REG, ACTION_MSG.OP_EXITOSA);
      },
      error: (err) => {
        this.msgSvc.add('error', ACTION_MSG.CREAR_REG, `${ACTION_MSG.OP_ERROR} : ${err}`);
      }
    });
  }

  confirmPopUp(e: Event, fn, arg) {
    this.confirmPopUpSvc.confirm({
      key: "popup-routes",
      target: e.target,
      acceptLabel: 'Si',
      rejectLabel: 'No',
      message: 'Esta seguro de elimar este item?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => { this[fn](arg); }
    });
  }


  resetModalObj(dt: any, mode: string) {
    switch (mode) {
      case 'new':
        this.objGrl.List.push({ ...dt });
        break;
      case 'edit':
        const indx = findIndex(this.objGrl.List, ['id', dt.id]);
        this.objGrl.List[indx] = dt;
        break;
      default:
        this.objGrl.List = filter(this.objGrl.List, i => (i.id !== dt.id));
        break;
    }
    this.refChanged.detectChanges();
    this.objMdl.form.reset();
    this.objMdl.selectedItem = { id: 0,nombre: '', descripcion: '', estado: false } as any;
    this.showDialog(false);
    if (mode === 'new')
      this.objGrl.List = this.sortItems(this.objGrl.List);
  }

  showDialog(rs: boolean) {
    this.objMdl.showDialog = rs;
  }

  cleanUpFrmVars() {
    this.objGrl = { slctdTodo: null};
    !!this.objGrl.frmTodoItems && this.objGrl.frmTodoItems.reset();
  }

  setPagination(e) {}

  sortItems(dt: any) {
      return orderBy(dt, ["id"], ["desc"]);
    }

  //#region *** Todo Item Modal Handler ***

  CategoryItemsMdl(row:any) {
    this.objGrl.slctdCategory = row;
    this.ref = this.dialogSvc.open(CategoryItemsComponent, {
        data: { category: row, categoryItemsList : this.objGrl.slctdCategory.items  } as CategoryDataMdl,
        header: `Categoria ${row.nombre}`,
        width: '75%',
        closable: false,
        contentStyle: { 'overflow': 'auto'},
        baseZIndex: 10000
    });

    this.ref.onClose.subscribe((rslt:CategoryDataMdl) => {
        this.cleaningSelectedCategoryView();
        this.objGrl.List.find( c => c.id === rslt.category.id).items = rslt.categoryItemsList;
      });
  }

  cleaningSelectedCategoryView() {
    this.objGrl.slctdCategory = null;
  }

  ClearTblCat(dt){
      dt.clear();
      this.inputBar.nativeElement.value = '';
  }
  //#endregion

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
