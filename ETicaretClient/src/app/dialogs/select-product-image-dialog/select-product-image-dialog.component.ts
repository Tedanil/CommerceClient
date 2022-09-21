import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { extend } from 'jquery';
import { Action } from 'rxjs/internal/scheduler/Action';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { BaseDialog } from '../base/base-dialog';

declare var $: any

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {

  constructor(dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private productService: ProductService) 
  {
     super(dialogRef)
   }

   

   

@Output() options: Partial<FileUploadOptions> = {
  accept: ".png, .jpg, .jpeg, .gif",
  action: "upload",
  controller: "products",
  explanation: "Lütfen resim seçin veya buraya sürükleyin",
  isAdminPage: true,
  queryString: `id=${this.data}`
 };

 images: List_Product_Image[];


async ngOnInit() {

  this.images = await this.productService.readImages(this.data as string)
     
}


}

export enum SelectProductImageState {
  Close
}
