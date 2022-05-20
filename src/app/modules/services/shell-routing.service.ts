import { Routes, Route } from '@angular/router';
import { PagesComponent } from '../../core/pages.component';
import { AuthServiceGuard } from 'src/app/services/auth/auth-service.guard';

/**
 * Provides helper methods to create routes.
 */
export class Shell {
  /**
   * Creates routes using the shell component and authentication.
   * @param routes The routes to add.
   * @return The new route using shell as the base.
   */
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: PagesComponent,
      children: routes,
      canActivate: [AuthServiceGuard],
    };
  }
}
