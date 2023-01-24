import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressInfoComponent } from './address-info.component';
import { RouterModule } from '@angular/router';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    AddressInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component:AddressInfoComponent}
    ]), MatFormFieldModule, MatButtonModule, MatInputModule
  ]
})
export class AddressInfoModule { }
