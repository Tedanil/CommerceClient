import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { RoleService } from 'src/app/services/common/models/role.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService,  private roleService: RoleService, private alertify: AlertifyService) {
    super(spinner)
   }

  ngOnInit(): void {}

  @Output() createdRole: EventEmitter<string> = new EventEmitter;
  create(name:HTMLInputElement) {
    this.showSpinner(SpinnerType.SquareJellyBox);
     
   


     this.roleService.create(name.value, () => {
        this.hideSpinner(SpinnerType.SquareJellyBox);
        this.alertify.message("Role Başariyla Eklenmiştir.", {

         dismissOthers: true,
         messageType: MessageType.Success,
         position: Position.TopRight

        });
        this.createdRole.emit(name.value);
      }, errorMessage => {
        this.alertify.message(errorMessage,
        {
             dismissOthers: true,
             messageType: MessageType.Error,
             position: Position.TopRight



        });
      });

    
  }

}
