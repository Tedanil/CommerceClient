import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-pre-information-dialog',
  templateUrl: './pre-information-dialog.component.html',
  styleUrls: ['./pre-information-dialog.component.scss']
})
export class PreInformationDialogComponent extends BaseDialog<PreInformationDialogComponent>  {

  constructor(
     dialogRef: MatDialogRef<PreInformationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PreInformationState,
  ) {
    super(dialogRef)
  }

  

}

export enum PreInformationState {
  Yes,
  No

}