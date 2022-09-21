import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { extend } from 'jquery';
import { Action } from 'rxjs/internal/scheduler/Action';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { BaseDialog } from '../base/base-dialog';

declare var $: any

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> {

  constructor(dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
  ) 
  {
     super(dialogRef)
   }

   x = [1, 23, ,12, 5, 6, 7, 55, 88, 23, 445, 86, 56, 76, 23, 49, 22,55, 676, 78, 80];

@Output() options: Partial<FileUploadOptions> = {
  accept: ".png, .jpg, .jpeg, .gif",
  action: "upload",
  controller: "products",
  explanation: "Lütfen resim seçin veya buraya sürükleyin",
  isAdminPage: true,
  queryString: `id=${this.data}`
 };

}

export enum SelectProductImageState {
  Close
}
