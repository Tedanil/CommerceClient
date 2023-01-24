import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressInfoComponent } from './address-info.component';
import { RouterModule } from '@angular/router';
import { MatFormField, MatFormFieldModule, MatHint } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    AddressInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component:AddressInfoComponent}
    ]), MatFormFieldModule, MatButtonModule, MatInputModule,MatSelectModule,MatOptionModule,MatIconModule
  ]
})
export class AddressInfoModule { }
