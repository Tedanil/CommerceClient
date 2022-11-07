import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { List_Role } from 'src/app/contracts/role/List_Role';
import { RoleService } from 'src/app/services/common/models/role.service';
import { BaseDialog } from '../base/base-dialog';

declare var $: any;

@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrls: ['./authorize-menu-dialog.component.scss']
})
export class AuthorizeMenuDialogComponent extends BaseDialog<AuthorizeMenuDialogComponent> implements OnInit {

  constructor(dialogRef: MatDialogRef<AuthorizeMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService) {
    super(dialogRef)
  }

  roles: { datas: List_Role[], totalRoleCount: number};
  

  async ngOnInit() {
    
  this.roles = await this.roleService.getRoles(-1, -1);
  }

  assignRoles(rolesComponent: MatSelectionList) {

    const roles: string[] = rolesComponent.selectedOptions.selected.map(o => o._text.nativeElement.innerText)

    console.log(roles);

  }

  

 
}

export enum AuthorizeMenuState {
  Yes,
  No
}
