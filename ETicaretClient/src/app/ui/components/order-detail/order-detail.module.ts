import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailComponent } from './order-detail.component';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component:OrderDetailComponent}
    ]),MatDialogModule, MatButtonModule, MatCardModule,   
    FormsModule,
    MatTableModule, MatToolbarModule,MatListModule,MatFormFieldModule, MatInputModule,
    
  ]
})
export class OrderDetailModule { }
