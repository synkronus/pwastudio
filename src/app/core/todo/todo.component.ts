import { Session } from '@supabase/supabase-js';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MessagingService } from 'src/app/common/shared/services/message.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import  UnSubscribe from 'src/app/common/shared/utils/unsubscribe';
import { get, omit } from 'lodash';
import { TodoService } from './todo.service';
import { Profile } from '../account/models/account.models';
import { TodoModel } from './todo.models';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent extends UnSubscribe implements OnInit  {

  urlResource = 'user/todo';
  componentTitle:  'Todo';
  loading = false;
  todos: TodoModel[] = [];
  cols: any[];


  objCfg: {[s:string]: any} = {
    fields: new Array<FormlyFieldConfig>(),
    form: new FormGroup({}),
    model: {
      id: 0,
      firstName:'',
      lastName:'',
      username:'',
      website:''
    },
  };

  objAccount = {
    profile: null as Profile,
    session: null as Session
  }

  constructor(private readonly todoSvc: TodoService,
                private toastService: MessagingService) { super();}

  ngOnInit() {
    this.cols = [
      { field: 'task', header: 'Task' },
      { field: 'is_complete', header: 'Done' }
    ];
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
      console.error(error);
    }
  }

  private resetForm() {
    this.objCfg.form.reset();
  }


  onSubmit() {
    if (this.objCfg.form.valid) {
      //...
    }
  }


  informUserError(err:string) {
    this.loading = false;
    this.toastService.add('warn','Service Message',err);
  }

}




