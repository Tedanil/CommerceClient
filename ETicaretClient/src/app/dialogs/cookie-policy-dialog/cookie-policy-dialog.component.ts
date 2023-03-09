import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-cookie-policy-dialog',
  templateUrl: './cookie-policy-dialog.component.html',
  styleUrls: ['./cookie-policy-dialog.component.scss']
})
export class CookiePolicyDialogComponent extends BaseDialog<CookiePolicyDialogComponent>  {

  constructor(
     dialogRef: MatDialogRef<CookiePolicyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PolicyState,
  ) {
    super(dialogRef)
  }

  

}

export enum PolicyState {
  Yes,
  No

}