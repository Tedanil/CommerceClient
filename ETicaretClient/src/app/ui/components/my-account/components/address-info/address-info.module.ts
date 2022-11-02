import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressInfoComponent } from './address-info.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AddressInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component:AddressInfoComponent}
    ]),
  ]
})
export class AddressInfoModule { }
