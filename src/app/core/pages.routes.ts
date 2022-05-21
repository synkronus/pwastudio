import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { StartComponent } from './home/start.component';
import { AuthServiceGuard } from '../services/auth/auth-service.guard';

const pagesRoutes: Routes = [
    {
        path: '', component: PagesComponent,
        canActivate: [AuthServiceGuard],
        children: [
            { path: '', redirectTo: '/inicio', pathMatch: 'full' },
            { path: 'inicio', canActivate: [AuthServiceGuard], component: StartComponent },
            { path: 'operations/categories', canActivate: [AuthServiceGuard], loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) },
            { path: 'operations/routes', canActivate: [AuthServiceGuard], loadChildren: () => import('./todo/simple-crud.module').then(m => m.SimpleCrudModule) },
        ]
    },
    { path: '**', redirectTo: '/inicio', pathMatch: 'full' },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
