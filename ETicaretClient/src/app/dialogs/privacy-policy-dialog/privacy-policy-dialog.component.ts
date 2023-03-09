import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-privacy-policy-dialog',
  templateUrl: './privacy-policy-dialog.component.html',
  styleUrls: ['./privacy-policy-dialog.component.scss']
})
export class PrivacyPolicyDialogComponent extends BaseDialog<PrivacyPolicyDialogComponent>  {

  constructor(
     dialogRef: MatDialogRef<PrivacyPolicyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PolicyState,
  ) {
    super(dialogRef)
  }

  

}

export enum PolicyState {
  Yes,
  No

}