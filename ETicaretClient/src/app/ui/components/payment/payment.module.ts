import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule, MatPseudoCheckboxModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PaymentComponent
  ],
  imports: [
    CommonModule,RouterModule.forChild([
      {path: "", component:PaymentComponent}
    ]), MatFormFieldModule, MatButtonModule, MatInputModule,MatSelectModule,MatOptionModule,MatIconModule,FormsModule,
  ],
  
})
export class PaymentModule { }
