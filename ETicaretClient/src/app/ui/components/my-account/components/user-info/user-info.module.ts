import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component:UserInfoComponent}
    ]),
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class UserInfoModule { }
