import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FileUploadComponent } from '../services/common/file-upload/file-upload.component';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { BasketItemRemoveDialogComponent } from './basket-item-remove-dialog/basket-item-remove-dialog.component';
import { ShoppingCompleteDialogComponent } from './shopping-complete-dialog/shopping-complete-dialog.component';
import { OrderDetailDialogComponent } from './order-detail-dialog/order-detail-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthorizeMenuDialogComponent } from './authorize-menu-dialog/authorize-menu-dialog.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatListModule} from '@angular/material/list';
import { CompleteOrderDialogComponent } from './complete-order-dialog/complete-order-dialog.component';
import { AuthorizeUserDialogComponent } from './authorize-user-dialog/authorize-user-dialog.component';
import { QrcodeDialogComponent } from './qrcode-dialog/qrcode-dialog.component';
import { QrcodeReadingDialogComponent } from './qrcode-reading-dialog/qrcode-reading-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { UpdateOrderStatusDialogComponent } from './update-order-status-dialog/update-order-status-dialog.component';
import { EditProductDialogComponent } from './edit-product-dialog/edit-product-dialog.component';
import { PrivacyPolicyDialogComponent } from './privacy-policy-dialog/privacy-policy-dialog.component';
import { CookiePolicyDialogComponent } from './cookie-policy-dialog/cookie-policy-dialog.component';
import { ConditionsDialogComponent } from './conditions-dialog/conditions-dialog.component';
import { PreInformationDialogComponent } from './pre-information-dialog/pre-information-dialog.component';



@NgModule({
  declarations: [DeleteDialogComponent,
  SelectProductImageDialogComponent,
  BasketItemRemoveDialogComponent,
  ShoppingCompleteDialogComponent,
  OrderDetailDialogComponent,
  AuthorizeMenuDialogComponent,
  CompleteOrderDialogComponent,
  AuthorizeUserDialogComponent,
  QrcodeDialogComponent,
  QrcodeReadingDialogComponent,
  UpdateOrderStatusDialogComponent,
  EditProductDialogComponent,
  PrivacyPolicyDialogComponent,
  CookiePolicyDialogComponent,
  ConditionsDialogComponent,
  PreInformationDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule, MatButtonModule, MatCardModule,
    FileUploadModule,
    FormsModule,
    MatTableModule, MatToolbarModule,MatBadgeModule,MatListModule,MatFormFieldModule, MatInputModule,
    NgxScannerQrcodeModule
  ]
})
export class DialogModule { }
