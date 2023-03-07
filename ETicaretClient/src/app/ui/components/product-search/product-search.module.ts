import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSearchComponent } from './product-search.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ProductSearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component:ProductSearchComponent}
    ])
  ]
})
export class ProductSearchModule { }
