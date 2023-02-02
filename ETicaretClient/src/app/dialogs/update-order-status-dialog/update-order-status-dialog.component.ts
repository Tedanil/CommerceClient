import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-update-order-status-dialog',
  templateUrl: './update-order-status-dialog.component.html',
  styleUrls: ['./update-order-status-dialog.component.scss']
})
export class UpdateOrderStatusDialogComponent extends BaseDialog<UpdateOrderStatusDialogComponent>{

  constructor(dialogRef: MatDialogRef<UpdateOrderStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateOrderState) {
    super(dialogRef)
  }

  complete() {

  }
}


export enum UpdateOrderState {
  Yes,
  No
}

