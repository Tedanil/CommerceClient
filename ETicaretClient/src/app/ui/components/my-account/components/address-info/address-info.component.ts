import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Address } from 'src/app/contracts/address/create_address';
import { List_City } from 'src/app/contracts/address/list_city';
import { User_Response } from 'src/app/contracts/users/user_response';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { AddressService } from 'src/app/services/common/models/address.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.scss']
})
export class AddressInfoComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService, 
    private alertifyService: AlertifyService,
     private userService: UserService,
     private addressService: AddressService,) {
    super(spinner)
   }

   currentUser : User_Response;
   cities2 : List_City[];
   
   

 async ngOnInit() {
  this.showSpinner(SpinnerType.BallElasticDot);
 
    
    const allCities: {cities:List_City[]} = await this.addressService.getCities(() => this.hideSpinner(SpinnerType.BallElasticDot), errorMessage => this.alertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    }));
    this.cities2 = allCities.cities
    

  }
 async create(city:HTMLInputElement, district: HTMLInputElement){
    const token: string = localStorage.getItem("refreshToken");
  
  this.currentUser = await this.userService.getUserByToken(token);

  const create_address : Create_Address = new Create_Address();
  create_address.city = city.value;
  create_address.district = district.value;
  create_address.userId = this.currentUser.userId;
  await this.addressService.create(create_address);
  

  }
  
}
interface Food {
  value: string;
  viewValue: string;
}

