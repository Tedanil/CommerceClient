import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Address_Info } from 'src/app/contracts/address/address_info';
import { Create_Address } from 'src/app/contracts/address/create_address';
import { List_City } from 'src/app/contracts/address/list_city';
import { List_District } from 'src/app/contracts/address/list_district';
import { User_Response } from 'src/app/contracts/users/user_response';
import { DynamicLoadComponentDirective } from 'src/app/directives/common/dynamic-load-component.directive';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ComponentType, DynamicLoadComponentService } from 'src/app/services/common/dynamic-load-component.service';
import { AddressService } from 'src/app/services/common/models/address.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';


declare var $: any;
@Component({
  selector: 'app-address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.scss']
})
export class AddressInfoComponent extends BaseComponent implements OnInit {
  

  constructor(spinner:NgxSpinnerService, 
    private alertifyService: AlertifyService,
     private userService: UserService,
     private addressService: AddressService,
     private toastrService: CustomToastrService,
     private router: Router,
     private dynamicLoadComponentService: DynamicLoadComponentService,
    
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

  
    
   
    
    // this.infos2 = this.infos2.map<Address_Info>(p => {
      
    //   const listInfo: Address_Info = {
    //     id: p.id,
    //     name: p.name,
    //     surname: p.surname,
    //     title: p.title,
    //     phoneNumber: p.phoneNumber,
    //     neighborhood: p.neighborhood,
    //     city: p.city,
    //     district: p.district,
    //     description: p.description,
        
        
    //   };




    //   return listInfo;
    // });
    // console.log(this.infos2)

  
 

    

  }
  

  
  
  

  }


 


  
   

    
  
  
  



