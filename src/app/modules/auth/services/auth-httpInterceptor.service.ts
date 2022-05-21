import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError} from "rxjs/operators";
import { UserLoginModel } from 'src/app/modules/auth/models/auth.model';
import { AuthService } from "./auth.service";

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  private token :string ;
  private isLogIn :boolean = false ;
  private usrLgn: UserLoginModel ;

    // private authService: AuthService, private router: Router,private http: HttpClient
  constructor(private injector: Injector) {
    this.authService.stateWithPropertyChanges.subscribe((state) => {
        if (!!state && state.stateChanges.hasOwnProperty("authStatus"))
          this.isLogIn = state.stateChanges.authStatus || false;
        if (!!state && state.stateChanges.hasOwnProperty("token"))
          this.token = state.stateChanges.token || null;
        if (!!state && state.stateChanges.hasOwnProperty("userLogin"))
          this.usrLgn = state.stateChanges.userLogin || null;
      });
      this.token = this.authService.GetStateLoginOp("token") || null;
      this.isLogIn = this.authService.GetStateLoginOp("authStatus") || false;
      this.usrLgn = this.authService.GetStateLoginOp("userLogin") || null;
  }
  private authService = this.injector.get(AuthService);
  private router = this.injector.get(Router);

  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    let authRequest: HttpRequest<any>;
    if (this.isLogIn) {
      authRequest = req.clone({ setHeaders: { authorization: `Bearer ${this.token}` } });
    } else {
      authRequest = req.clone();
    }
    return next.handle(authRequest).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err && err.status === 401) {
          this.JustLogOut(err,'no tkn-expired');
        }
        return throwError(() => err);
      })
    );
  }

 private JustLogOut(err,wr) {
   if(err  && (err.status == 401 || err.status == 422)){
     this.authService.SignOut();
     this.router.navigate(["/login"], { queryParams: {redirectUrl: this.router.routerState.snapshot.url || "" } });
   }
    return throwError(() => err);
  }


}


// export class TokenInterceptor implements HttpInterceptor {
//   private refreshTokenInProgress = false;
//   private refreshTokenSubject: Subject<any> = new BehaviorSubject<any>(null);

//   constructor(public authService: AuthService) { }
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//       if (request.url.indexOf('refresh') !== -1) {
//           return next.handle(request);
//       }

//       const accessExpired = this.authService.isAccessTokenExpired();
//       const refreshExpired = this.authService.isRefreshTokenExpired();

//       if (accessExpired && refreshExpired) {
//           return next.handle(request);
//       }
//       if (accessExpired && !refreshExpired) {
//           if (!this.refreshTokenInProgress) {
//               this.refreshTokenInProgress = true;
//               this.refreshTokenSubject.next(null);
//               return this.authService.requestAccessToken().pipe(
//                   switchMap((authResponse) => {
//                       this.authService.saveToken(AuthService.TOKEN_NAME, authResponse.accessToken);
//                       this.authService.saveToken(AuthService.REFRESH_TOKEN_NAME, authResponse.refreshToken);
//                       this.refreshTokenInProgress = false;
//                       this.refreshTokenSubject.next(authResponse.refreshToken);
//                       return next.handle(this.injectToken(request));
//                   }),
//               );
//           } else {
//               return this.refreshTokenSubject.pipe(
//                   filter(result => result !== null),
//                   take(1),
//                   switchMap((res) => {
//                       return next.handle(this.injectToken(request))
//                   })
//               );
//           }
//       }

//       if (!accessExpired) {
//           return next.handle(this.injectToken(request));
//       }
//   }

//   injectToken(request: HttpRequest<any>) {
//       const token = this.authService.getToken(AuthService.TOKEN_NAME);
//       return request.clone({
//           setHeaders: {
//               Authorization: `Bearer ${token}`
//           }
//       });
//   }
// }



// if (!dt.success]) { this.router.navigate(['/login']); return false; }
//             this.SetStoreSignIn(dt);
//             this.localStorageService.setItem("usrLgndt", dt);
//             let xT = this.dtTranform(dt.objModel.user_claims);
//             this.menuService.setMenuOp("menuItems",xT, "AuthService::fetchUserLoginData");
//             return dt;

// if (response.status === 401 && response.headers.has('Token-Expired')) {
//   var refreshToken = getRefreshToken();

//   var refreshResponse = await refresh(jwtToken, refreshToken);
//   if (!refreshResponse.ok) {
//       return response; //failed to refresh so return original 401 response
//   }
//   var jsonRefreshResponse = await refreshResponse.json(); //read the json with the new tokens

//   saveJwtToken(jsonRefreshResponse.token);
//   saveRefreshToken(jsonRefreshResponse.refreshToken);
//   return await fetchWithCredentials(url, options); //repeat the original request
// } else { //status is not 401 and/or there's no Token-Expired header
//   return response; //return the original 401 response
// }
