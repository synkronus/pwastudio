import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesService } from './services/categories.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryItemsComponent } from './category-items/category-items.component';
import { SharedAppModule } from 'src/app/common/shared/shared-app.module';

const childRoutes : Routes = [
  { path: '', component: CategoriesComponent  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(childRoutes),
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedAppModule
  ],
  declarations: [CategoriesComponent,CategoryItemsComponent],
  providers: [ CategoriesService]
})
export class CategoriesModule { }
