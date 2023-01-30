import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Address_Info } from 'src/app/contracts/address/address_info';
import { User_Response } from 'src/app/contracts/users/user_response';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { AddressService } from 'src/app/services/common/models/address.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent extends BaseComponent implements OnInit {
  

  constructor(spinner:NgxSpinnerService, 
    private alertifyService: AlertifyService,
     private userService: UserService,
     private addressService: AddressService,
     private toastrService: CustomToastrService,
     private router: Router,
     private dialogService: DialogService,
    
    ) {
    super(spinner)
   }
  
 
   currentUser : User_Response;
   infos:Address_Info[]
   
  
   
   
 

 async ngOnInit() {
  this.showSpinner(SpinnerType.BallElasticDot);

 const token: string = localStorage.getItem("refreshToken");
  
  this.currentUser = await this.userService.getUserByToken(token);
    
    
    const allInfos: {infos:Address_Info[]} = await this.addressService.getAddressInfo(this.currentUser.userId,() => this.hideSpinner(SpinnerType.BallElasticDot), errorMessage => this.alertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    }));
    this.infos = allInfos.infos
    console.log(this.infos)


  }
  showCase(id: string){
    
  }
  

}

