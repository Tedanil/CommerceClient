import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CategoryListComponent } from './category-list/category-list.component';




@NgModule({
  declarations: [
    ProductsComponent,
    ListComponent,
    CategoryListComponent
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component:ProductsComponent}
    ])
  ]
})
export class ProductsModule { }
