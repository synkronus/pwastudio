import { Injectable } from '@angular/core';
import { AuthChangeEvent, createClient, Provider, Session,
              SupabaseClient, User, } from '@supabase/supabase-js';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile } from '../models/account.models';

export interface AuthStateChanges  {
  event: AuthChangeEvent | null;
  session: Session | null;
}

@Injectable()
export class AccountService {
  private supabaseClient: SupabaseClient;
  token: string | undefined;

  private userAuthChange$: BehaviorSubject<AuthStateChanges> = new BehaviorSubject({} as AuthStateChanges);
  public readonly userAuthCurrentState: Observable<AuthStateChanges> = this.userAuthChange$.asObservable();

  constructor() {
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.supabaseClient.auth.onAuthStateChange((event, session) => {
      console.log('auth changes ***', event, session);
      this.userAuthChange$.next({event, session});
    });
  }

//#region   User config

  getSession(): Session | null {
    return this.supabaseClient.auth.session();
  }

  get user() {
    return this.supabaseClient.auth.user();
  }

  get session() {
    return this.supabaseClient.auth.session();
  }

  get profile() {
    return this.supabaseClient
      .from('profiles')
      .select(`username, firstName, lastName, website, avatar_url`)
      .eq('id', this.user?.id)
      .single();
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      id: this.user?.id,
      updated_at: new Date(),
    };
    return this.supabaseClient.from('profiles').upsert(update, {
      returning: 'minimal', // Don't return the value after inserting
    });
  }

  downLoadImage(path: string) {
    return this.supabaseClient.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabaseClient.storage.from('avatars').upload(filePath, file);
  }

//#endregion

//#region Auth

  signUp(email: string, password: string) {
    return this.supabaseClient.auth.signUp({ email, password });
  }

  signIn(email: string, password: string) {
    return this.supabaseClient.auth.signIn({ email, password });
  }

  signInWithProvider(provider: Provider) {
    return this.supabaseClient.auth.signIn({ provider }, {
      redirectTo: 'http://localhost:4200/'
    });
  }

  signInWithProviderObs(provider: Provider): Observable<any> {
    return from(this.supabaseClient.auth.signIn({ provider }));
  }

  signOut() {
    return this.supabaseClient.auth.signOut();
  }

  resetPassword(email: string) {
    return this.supabaseClient.auth.api.resetPasswordForEmail(email);
  }

  handleNewPassword(newPassword: string) {
    return this.supabaseClient.auth.api.updateUser(this.token as string, {
      password: newPassword,
    });
  }

//#endregion



}
