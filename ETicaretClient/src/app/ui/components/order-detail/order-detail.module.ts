import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailComponent } from './order-detail.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component:OrderDetailComponent}
    ])
  ]
})
export class OrderDetailModule { }
