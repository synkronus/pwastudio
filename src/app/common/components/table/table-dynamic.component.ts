import { TranslateService } from '@ngx-translate/core';
import { Component,  Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { intersectionWith, isEqual } from 'lodash';
import UnSubscribe from 'src/app/shared/constants/unsubscribe';

@Component({
  selector: 'app-table-dynamic',
  templateUrl: './table-dynamic.component.html',
  styleUrls: ['./table-dynamic.component.scss'],
})
export class TableDynamicComponent extends UnSubscribe implements OnInit {

    @ViewChild('inptSearch') inputSearch;
    @Input() objDefinitions: any;
    @Input() verLog = false;
    @Input() seeSpaces = false;
    @Output() onEditItem = new EventEmitter<any>();
    @Output() onItemDeleted = new EventEmitter<any>();
    @Output() verLogMdl = new EventEmitter<any>();
    @Output() seeSpacesMdl = new EventEmitter<any>();
    _colsSelected = [];

    constructor(private translate: TranslateService) {
        super();
    }

    ngOnInit() {
        this._colsSelected = intersectionWith(this.objDefinitions.selectedColumns, this.objDefinitions.cols, isEqual);
    }

    onEditRow(row: typeof this.objDefinitions.dataSource, mode:boolean): void {
        this.onEditItem.emit({row, mode});
    }

    clearTbl(dt){
        dt.clear();
        this.inputSearch.nativeElement.value = '';
    }

    @Input() get selectedLocalColumns(): any[] {
        return this._colsSelected;
    }

    set selectedLocalColumns(val: any[]) {
        this._colsSelected = this.objDefinitions.cols.filter(col => val.includes(col));
    }

}
