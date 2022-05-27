import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';

const appRoutes : Routes = [
    { path: '', redirectTo: '/login',pathMatch : 'full'},
    { path : 'login', component : LoginComponent},
    { path: '**', redirectTo: '/login',pathMatch : 'full'},
];
export const AppRoutesModule = RouterModule.forRoot(appRoutes, {scrollPositionRestoration: 'enabled'});
