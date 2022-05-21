import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceGuard implements CanActivate {
  private isAuthenticated = false;
  constructor(public authService: AuthService, public router: Router) {
      this.authService.stateWithPropertyChanges.subscribe((stt) => {
        if (!!stt && stt.stateChanges.hasOwnProperty("authStatus")) {
          this.isAuthenticated = stt.stateChanges.authStatus || false;
        }
      });
      this.isAuthenticated = this.authService.GetStateLoginOp("authStatus") || false;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }
    else if ( !!this.isAuthenticated && (state.url == '/' || state.url == '')) {
      this.router.navigate(['/login'], { queryParams: { redirect: state.url }, replaceUrl: true });
    }
    return true;
  }
}
