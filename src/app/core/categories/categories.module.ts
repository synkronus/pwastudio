import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesService } from './services/categories.service';
import { PRIMENG_MODULE, PRIMENG_PROVIDERS } from '../../modules/primeng.modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryItemsComponent } from './category-items/category-items.component';

const childRoutes : Routes = [
  { path: '', component: CategoriesComponent  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(childRoutes),
    PRIMENG_MODULE,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [CategoriesComponent,CategoryItemsComponent],
  providers: [PRIMENG_PROVIDERS, CategoriesService]
})
export class CategoriesModule { }
