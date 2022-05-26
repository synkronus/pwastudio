import { Session } from '@supabase/supabase-js';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MessagingService, MSG_UTILS } from 'src/app/common/shared/services/message.service';
import  UnSubscribe from 'src/app/common/shared/utils/unsubscribe';
import { get, omit } from 'lodash';
import { TodoService } from './todo.service';
import { Profile } from '../account/models/account.models';
import { FieldsCfg, TodoModel } from './todo.models';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent extends UnSubscribe implements OnInit  {

  urlResource = 'user/todo';
  componentTitle =  'Todos';
  loading = false;
  todos: TodoModel[] = [];
  cols: any[];

  objCfg: {[s:string]: any} = {
    fields: new Array<FormlyFieldConfig>(),
    form: new FormGroup({}),
    model: {
      id: 0,
      task:'',
      is_complete:null
    },
    showDialog: false
  };

  objAccount = {
    profile: null as Profile,
    session: null as Session
  }

  constructor(private readonly todoSvc: TodoService,
                private msgService: MessagingService,
                  private confirmPopUpSvc: ConfirmationService) { super();}

  ngOnInit() {
    this.cols = [
      { field: 'task', header: 'Task' },
      { field: 'is_complete', header: 'Done' }
    ];
    this.objCfg.fields = [...FieldsCfg];
    this.fetchTodos();
   }

   async fetchTodos(): Promise<void> {
    let { data: todos, error } = await this.todoSvc.fetchTodos();
    if (error) {
      console.error('error', error.message);
    } else {
      this.todos = todos ?? [];
    }
  }

  onChangeRow(is_complete, rowData): void {
    const checkedValue = get(is_complete,['checked'], false);
    this.toggleComplete(rowData.id, checkedValue);
  }

  async toggleComplete(id: string, is_complete: boolean): Promise<void> {
    try {
      await this.todoSvc.toggleComplete(id, is_complete);
    } catch (error) {
      console.error('toggleComplete ***', error);
    }
  }

  async handleDeleteTodo(id: string): Promise<void> {
    try {
      await this.todoSvc.deleteTodo(id);
      this.todos = this.todos.filter((todo) => todo.id !== id);
    } catch (error) {
      console.error('handleDeleteTodo ***', error);
    }
  }

  onDeleteCmd(e: Event, rowData) {
    this.confirmPopUpSvc.confirm({
        ...this.msgService.confirmPopOverWrap(),
          key: 'popup-todos',
          target: e.target,
          accept: () => { this.handleDeleteTodo(rowData.id); }
      });
  }

  showMdlHandler(row:any, mode:string) {
    this.showDialog(true);
  }

  showDialog(show: boolean) {
    this.objCfg.showDialog = show;
  }


  async onSubmit() {
    if (this.objCfg.form.valid) {
      let { data: todo, error } = await this.todoSvc.addTodo(get(this.objCfg.model,['task'],'New Task'));
      if (error) {
        this.informUserError(error.message);
      } else {
        this.todos = [todo, ...this.todos];
        this.msgService.add(MSG_UTILS.SUCCESS,'Todos','New Todo Added');
        this.resetForm();
      }
    }
  }
    private resetForm() {
      this.objCfg.form.reset();
    }

  informUserError(err:string) {
    this.loading = false;
    this.msgService.add(MSG_UTILS.ERROR,'Service Message',err);
  }

}




