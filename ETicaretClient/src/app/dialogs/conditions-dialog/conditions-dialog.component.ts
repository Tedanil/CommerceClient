import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-conditions-dialog',
  templateUrl: './conditions-dialog.component.html',
  styleUrls: ['./conditions-dialog.component.scss']
})
export class ConditionsDialogComponent extends BaseDialog<ConditionsDialogComponent>  {

  constructor(
     dialogRef: MatDialogRef<ConditionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConditionsState,
  ) {
    super(dialogRef)
  }

  

}

export enum ConditionsState {
  Yes,
  No

}