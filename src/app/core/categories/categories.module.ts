import { NgModule } from '@angular/core';
import { CategoriesComponent } from './categories.component';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesService } from './services/categories.service';
import { PRIMENG_PROVIDERS } from '../../common/shared/primeng.modules';
import { CategoryItemsComponent } from './category-items/category-items.component';

const childRoutes : Routes = [
  { path: '', component: CategoriesComponent  }
];

@NgModule({
  imports: [
    RouterModule.forChild(childRoutes),
  ],
  declarations: [CategoriesComponent,CategoryItemsComponent],
  providers: [PRIMENG_PROVIDERS, CategoriesService]
})
export class CategoriesModule { }
