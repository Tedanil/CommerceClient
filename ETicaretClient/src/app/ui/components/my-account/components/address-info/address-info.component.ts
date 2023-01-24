import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { Create_Address } from 'src/app/contracts/address/create_address';
import { User_Response } from 'src/app/contracts/users/user_response';
import { AlertifyService } from 'src/app/services/admin/alertify.service';
import { AddressService } from 'src/app/services/common/models/address.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.scss']
})
export class AddressInfoComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService, 
    private alertify: AlertifyService,
     private userService: UserService,
     private addressService: AddressService) {
    super(spinner)
   }

   currentUser : User_Response;

  ngOnInit(): void {
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
