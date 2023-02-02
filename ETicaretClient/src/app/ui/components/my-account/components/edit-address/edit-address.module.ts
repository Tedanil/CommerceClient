import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditAddressComponent } from './edit-address.component';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EditAddressComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component:EditAddressComponent}
    ]), MatFormFieldModule, MatButtonModule, MatInputModule,MatSelectModule,MatOptionModule,MatIconModule,ReactiveFormsModule
  ]
})
export class EditAddressModule { }
