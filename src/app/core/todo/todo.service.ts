import { Injectable } from '@angular/core';
import { AuthChangeEvent, createClient, Provider, Session,
              SupabaseClient, User, } from '@supabase/supabase-js';
import { get } from 'lodash';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { environment } from 'src/environments/environment';

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

  constructor(private readonly authService: AuthService) {
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.supabaseClient.auth.onAuthStateChange((event, session) => {
      this.userAuthChange$.next({event, session});
    });
  }

//#region   Todos
  fetchTodos() {
    const userId = get(this.authService.user,['id'], null);
    return this.supabaseClient.from('todos')
            .select('*')
              .eq('user_id', userId)
                .order('id', { ascending: false });
  }

  addTodo(task: string) {
    const userId = get(this.authService.user,['id'], null) as string;
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
