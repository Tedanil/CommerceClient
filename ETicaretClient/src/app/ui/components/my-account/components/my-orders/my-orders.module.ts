import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyOrdersComponent } from './my-orders.component';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';
import { DialogModule } from 'src/app/dialogs/dialog.module';
import { DeleteDirectiveModule } from 'src/app/directives/admin/delete.directive.module';



@NgModule({
  declarations: [
    MyOrdersComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component:MyOrdersComponent}
    ]),
    MatSidenavModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatPaginatorModule,
      FileUploadModule, DialogModule,DeleteDirectiveModule
  ]
})
export class MyOrdersModule { }
