import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SubSink } from 'subsink';
import { MessagingService } from '../../../modules/services/message.service';
import { CategoryDataMdl, CategoryItemCrudDto, CategoryItemsDto } from '../models/categories.models';
import { CategoryItemsService } from '../services/category-items.service';
import { isNumber, findIndex, filter, orderBy } from 'lodash';
import { ACTION_MSG } from '../../../shared/constants/constants';

@Component({
  selector: 'app-category-items',
  templateUrl: './category-items.component.html',
  styleUrls: ['./category-items.component.scss']
})
export class CategoryItemsComponent implements OnInit,OnDestroy {

  objGrb: { [s:string] : any } = { form: FormGroup,
    selectedItem:  { id:0,nombre: '', descripcion: '', codigo: '', estado: false} as CategoryItemsDto,
    localCategoryDT: CategoryDataMdl,
  };

  subSink = new SubSink();

    constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig,
                  private fb: FormBuilder, private ctgItemsSvc: CategoryItemsService, private msgSvc: MessagingService,
                    private confirmPopUpSvc: ConfirmationService) {
      this.objGrb.localCategoryDT = {
            category: this.config.data.category,
            categoryItemsList: this.sortItems(this.config.data.categoryItemsList) }
    }

  ngOnInit(): void {
      this.objGrb.form = this.fb.group({
        id : [{value: 0, disabled:true}],
        nombre : ['', Validators.required],
        descripcion : ['', Validators.required],
        codigo: ['', Validators.required],
        estado : false
      });
  }

  renderForm(dt:CategoryItemsDto, mode:boolean) {
    this.objGrb.selectedItem = {...dt};
      if(mode) {
        const x = {
          id: (isNumber(dt.id) && dt.id > 0) ? dt.id : 0,
          nombre: dt.nombre,
          descripcion: dt.descripcion,
          estado: dt.estado
        } ;
        this.objGrb.form.patchValue({...x});
    }else  {
      this.objGrb.form.reset();
      this.objGrb.form.patchValue({id:0});
    }
  }

  saveData() {
    if(this.objGrb.form.valid ) {
      const rwVls = {...this.objGrb.form.value } as any;
      const rvwObj = {
          id: this.objGrb.selectedItem.id,
          categoriaId: this.objGrb.localCategoryDT.category.id,
          nombre: rwVls.nombre,
          descripcion: rwVls.descripcion,
          codigo: rwVls.codigo,
          estado: rwVls.estado ? 1 : 0
        } as CategoryItemCrudDto;
      if( this.objGrb.selectedItem.id > 0 ) {
          this.onUpdateItem(rvwObj);
      }else {
          this.onCreateItem({...rvwObj, id: 0});
      }
    }
  }

  onUpdateItem(rvwObj: CategoryItemCrudDto) {
    this.subSink.sink = this.ctgItemsSvc.UpdateItem(rvwObj).subscribe({next: rs => {
      this.resetModalObj(rvwObj,'edit');
      this.msgSvc.add('success', ACTION_MSG.ACTUALIZAR_REG, ACTION_MSG.OP_EXITOSA);
    },
    error: (err) => {
      this.msgSvc.add('error', ACTION_MSG.ACTUALIZAR_REG, `${ACTION_MSG.OP_ERROR} : ${err}`);
    }});
  }

  onCreateItem(rvwObj: CategoryItemCrudDto) {
    this.subSink.sink = this.ctgItemsSvc.CreateItem(rvwObj).subscribe({next: rs => {
      this.resetModalObj({...rvwObj, id:rs},'new');
      this.msgSvc.add('success', ACTION_MSG.CREAR_REG, ACTION_MSG.OP_EXITOSA);
    },
    error: (err) => {
      this.msgSvc.add('error', ACTION_MSG.CREAR_REG, `${ACTION_MSG.OP_ERROR} : ${err}`);
    }});
  }

  resetModalObj(dt:CategoryItemCrudDto, mode:string) {
    switch (mode) {
      case 'new':
        this.objGrb.localCategoryDT.categoryItemsList.push(dt);
        break;
      case 'edit':
        const indx = findIndex(this.objGrb.localCategoryDT.categoryItemsList, ['id', dt.id]);
        this.objGrb.localCategoryDT.categoryItemsList[indx] = dt;
        break;
      default:
        this.objGrb.localCategoryDT.categoryItemsList= filter(this.objGrb.localCategoryDT.categoryItemsList,i => (i.id !== dt.id));
        break;
    }
    this.objGrb.localCategoryDT.categoryItemsList = this.sortItems(this.objGrb.localCategoryDT.categoryItemsList);
    this.objGrb.form.reset();
    this.objGrb.form.patchValue({id:0});
    this.objGrb.selectedItem = {id:0} as CategoryItemCrudDto;
  }

  sortItems(dt:any) {
    return orderBy(dt,['id'],['desc']);;
  }

  hideDialog() {
    this.objGrb.localCategoryDT.category.items = this.objGrb.localCategoryDT.categoryItemsList;
    this.ref.close({category: this.objGrb.localCategoryDT.category, categoryItemsList: this.objGrb.localCategoryDT.categoryItemsList } as CategoryDataMdl);
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

}
