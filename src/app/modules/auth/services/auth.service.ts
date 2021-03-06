import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ObservableStore } from '@codewithdan/observable-store';

import { AuthStateChanges, UserLoginModel } from 'src/app/modules/auth/models/auth.model';

import { SafeUrl, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AUTH_STATE_CHANGES, USER_OBJ_CLAIMS } from 'src/app/common/constants/constants';
import { environment } from 'src/environments/environment';

import { AuthStoreState, AuthStoreActions } from 'src/app/common/app-state/store-states';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MenuService } from 'src/app/common/shared/services/menu.service';
import { createClient, Provider, SupabaseClient } from '@supabase/supabase-js';

export interface UserCredentials {
  email: string;
  password: string;
}
@Injectable({
  providedIn: "root",
})
export class AuthService extends ObservableStore<AuthStoreState> {

  private supabaseClient: SupabaseClient;

  constructor(
    private localStorageService: LocalStorageService, private readonly http: HttpClient,
    private router: Router, private menuService: MenuService, private sanitizer: DomSanitizer) {
    super({
      stateSliceSelector: (state) => {
        return {
          userLogin: state !== null ? state.userLogin : null,
          menu: state !== null ? state.menu : null,
          token: state !== null ? state.token : null,
          refreshToken: state !== null ? state.refreshToken : null,
          authStatus: state !== null ? state.authStatus : null,
          authStateChanges: state !== null ? state.AuthStateChanges : null,
        };
      },
    });

    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.supabaseClient.auth.onAuthStateChange((event, session) => {
      this.updateStoreAuthChanges(event, session);
    });
  }

  updateStoreAuthChanges(event, session) {
    switch (event) {
      case AUTH_STATE_CHANGES.SIGNED_IN:
        this.SetStateLoginOp('authStateChanges', {event, session}, 'this');
        this.initSessionStorage();
      break;
      case AUTH_STATE_CHANGES.SIGNED_OUT:
          this.cleanUpStogare();
      break;
      case AUTH_STATE_CHANGES.TOKEN_REFRESHED:
          console.log('TOKEN_REFRESHED', session)
        break;
      case AUTH_STATE_CHANGES.USER_UPDATED:
          console.log('USER_UPDATED', session)
        break;
      case AUTH_STATE_CHANGES.USER_DELETED:
          console.log('USER_DELETED', session)
        break;
      case AUTH_STATE_CHANGES.PASSWORD_RECOVERY:
          console.log('PASSWORD_RECOVERY', session)
        break;
    }
  }

//#region *** MS ***
  getUserPhoto(dt): Observable<SafeUrl> {
    let headers: Headers = new Headers();
    headers.append("Authorization", "Bearer " + dt.idToken.rawIdToken);
    let requestUrl = `https://graph.microsoft.com/beta/me/photo/$value`;
    return this.http.get(requestUrl, { responseType: "blob" }).pipe(map(result => {
      let url = window.URL;
      return url.createObjectURL(result);
      // return this.sanitizer.bypassSecurityTrustUrl(url.createObjectURL(result));
    }));
  }
//#endregion

  hasClaim(claimType: any, claimValue?: any) { // Usage :   *hasClaim="'featureName'"
    let claims = this.GetStateLoginOp("userLogin");
    let xT = claims.urole;
    return xT !== "Usuario";
  }

//#region user signin & signout
  get user() {
    return this.supabaseClient.auth.user();
  }

  async SignOut() {
    await this.supabaseClient.auth.signOut();
  }

  SignInProxy(mode: boolean, crdntls?: UserCredentials, provider?: Provider) {
    return mode ? this.signInWithProvider(provider) : this.signInWithEmailPwd(crdntls.email, crdntls.password);
  }

  signInWithEmailPwd(email, password) {
    return this.supabaseClient.auth.signIn({ email, password });
  }

  signInWithProvider(provider: Provider) {
    return this.supabaseClient.auth.signIn(
      { provider },
      { redirectTo: environment.redirectUrl});
  }

  initSessionStorage() {
    this.SetStoreSignIn(USER_OBJ_CLAIMS);
    this.localStorageService.setItem("usrLgndt", USER_OBJ_CLAIMS);
    this.menuService.setMenuOp("menuItems", USER_OBJ_CLAIMS.objModel.user_claims, "AuthService::fetchUserLoginData");
  }

  cleanUpStogare() {
    this.localStorageService.removeItem("usrLgndt");
    sessionStorage.clear();
    this.SetStoreSignIn({});
  }
//#endregion


  SignInMs(InfData) {
    let headers = new HttpHeaders().set("content-type", "application/json")
      .set('authorization', `Bearer ${InfData.idToken.rawIdToken}`);
    return this.http
      .post<any>(`${environment.base_url}/usuario`, { correo: InfData.account.accountIdentifier }, { headers })
      .pipe(
        tap(dt => {
          USER_OBJ_CLAIMS.objModel.id_usuario = dt[0].id;
          USER_OBJ_CLAIMS.objModel.nombre_completo = dt[0].nombres + " " + dt[0].apellidos;
          USER_OBJ_CLAIMS.objModel.profesion = dt[0].nombreRol;
          USER_OBJ_CLAIMS.objModel.user_claims = JSON.parse(dt[0].user_claims);
          this.SetStoreSignIn(USER_OBJ_CLAIMS);
          this.localStorageService.setItem("usrLgndt", USER_OBJ_CLAIMS);
          this.menuService.setMenuOp("menuItems", USER_OBJ_CLAIMS.objModel.user_claims, "AuthService::fetchUserLoginData");
          return USER_OBJ_CLAIMS;
        })
      );
  }

  SignInV2(credentials): Observable<UserLoginModel> {
    const headers = new HttpHeaders().set("content-type", "application/json");
    return this.http
      .post<any>(`${environment.base_url}/auth/singin`, credentials, {
        headers,
      })
      .pipe(tap((dt) => {
        if (!dt["success"]) {
          this.router.navigate(["/login"]); return false;
        } else {
          this.SetStoreSignIn(USER_OBJ_CLAIMS);
          this.localStorageService.setItem("usrLgndt", USER_OBJ_CLAIMS);
          this.menuService.setMenuOp("menuItems", USER_OBJ_CLAIMS.objModel.user_claims, "AuthService::fetchUserLoginData");
          return USER_OBJ_CLAIMS;
        }
      })
      );
  }

  private SetStoreSignIn(dt): void {
    this.setState(
      { userLogin: (!!dt.hasOwnProperty('objModel') && dt.objModel) || null },
      `${AuthStoreActions.UserLogin}`
    );
    this.setState(
      { token: (!!dt.hasOwnProperty('token') && dt.token) || null },
      `${AuthStoreActions.Token}`
    );
    this.setState(
      { authStatus: (!!dt.hasOwnProperty('success') && dt.success) || false },
      `${AuthStoreActions.AuthStatus}`
    );
  }

  SetStateLoginOp(op, dt, wh): any {
    switch (op) {
      case "userLogin":
        this.setState({ userLogin: dt }, `${AuthStoreActions.UserLogin}~${wh}`);
        break;
      case "token":
        this.setState({ token: dt }, `${AuthStoreActions.Token}~${wh}`);
        break;
      case "authStatus":
        this.setState({ authStatus: dt }, `${AuthStoreActions.AuthStatus}~${wh}`);
        break;
      case "refreshToken":
        this.setState( { refreshToken: dt }, `${AuthStoreActions.ResfeshToken}~${wh}`);
        break;
      case "authStateChanges":
        this.setState( { authStateChanges: dt as AuthStateChanges }, `${AuthStoreActions.AuthStateChanges}~${wh}`);
        break;
    }
  }

  GetStateLoginOp(op, dt?, wh?): any {
    switch (op) {
      case "userClaims":
        return this.getState().userLogin;
      case "userLogin":
        return this.getState().userLogin;
      case "authStatus":
        let xSt = this.getState().authStatus;
        if (xSt != null) return xSt;
        else {
          let dt = this.localStorageService.getItem("usrLgndt");
          if (!dt) return false;
          this.SetStoreSignIn(dt);
          this.menuService.setMenuOp(
            "menuItems",
            dt.objModel.user_claims,
            "AuthService::GetStateLoginOp"
          );
          return dt.success;
        }
      case "refreshToken":
        return this.getState().refreshToken;
    }
  }

  InitAuthStoreState(op?, wh?): void {
    const initialState = {
      userLogin: null,
      menu: null,
      token: null,
      refreshToken: null,
      authStateChanges: null,
    };
    this.setState(initialState, `${AuthStoreActions.InitAuthStore}~${wh}`);
  }

}



