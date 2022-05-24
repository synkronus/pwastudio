import { Injectable } from '@angular/core';
import { AuthChangeEvent, createClient, Provider, Session,
              SupabaseClient, User, } from '@supabase/supabase-js';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile } from '../account/models/account.models';

export interface AuthStateChanges  {
  event: AuthChangeEvent | null;
  session: Session | null;
}

@Injectable()
export class TodoService {
  private supabaseClient: SupabaseClient;
  token: string | undefined;

  private userAuthChange$: BehaviorSubject<AuthStateChanges> = new BehaviorSubject({} as AuthStateChanges);
  public readonly userAuthCurrentState: Observable<AuthStateChanges> = this.userAuthChange$.asObservable();

  constructor() {
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.supabaseClient.auth.onAuthStateChange((event, session) => {
      this.userAuthChange$.next({event, session});
    });
  }


  getSession(): Session | null {
    return this.supabaseClient.auth.session();
  }


//#region   Todos
  fetchTodos() {
    return this.supabaseClient.from('todos').select('*').order('id', { ascending: false });
  }

  addTodo(task: string) {
    const userId = this.getSession()?.user?.id as string;
    return this.supabaseClient.from('todos').insert({ task, user_id: userId }).single();
  }

  toggleComplete(id: string, is_complete: boolean) {
    return this.supabaseClient
      .from('todos')
      .update({ is_complete })
      .eq('id', id)
      .single();
  }

  deleteTodo(id: string) {
    return this.supabaseClient.from('todos').delete().eq('id', id);
  }
//#endregion


}
