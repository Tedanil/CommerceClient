import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Address } from 'src/app/contracts/address/create_address';
import { List_City } from 'src/app/contracts/address/list_city';
import { List_District } from 'src/app/contracts/address/list_district';
import { User_Response } from 'src/app/contracts/users/user_response';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { AddressService } from 'src/app/services/common/models/address.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.scss']
})
export class CreateAddressComponent extends BaseComponent implements OnInit {
  

  constructor(spinner:NgxSpinnerService, 
    private alertifyService: AlertifyService,
     private userService: UserService,
     private addressService: AddressService,
     private toastrService: CustomToastrService,
     private router: Router,
     
    
    ) {
    super(spinner)
   }
  
   @ViewChild('selectCity') selectCity: any;
   selectedCityId: number;
   currentUser : User_Response;
   cities2 : List_City[];
   districts2: List_District[];
   
   
  async onSelectChange(event) {
    this.selectedCityId = event.value;
    this.showSpinner(SpinnerType.BallElasticDot);
  const allDistricts: {districts:List_District[]} = await this.addressService.getDistricts(this.selectedCityId as number,() => this.hideSpinner(SpinnerType.BallElasticDot), errorMessage => this.alertifyService.message(errorMessage, {
    dismissOthers: true,
    messageType: MessageType.Error,
    position: Position.TopRight
  }));
  this.districts2 = allDistricts.districts
  
  }

 async ngOnInit() {
  this.showSpinner(SpinnerType.BallElasticDot);
 
    
    
    const allCities: {cities:List_City[]} = await this.addressService.getCities(() => this.hideSpinner(SpinnerType.BallElasticDot), errorMessage => this.alertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    }));
    this.cities2 = allCities.cities

  
 

    

  }
  
 async create(name:HTMLInputElement, surname: HTMLInputElement, phone:HTMLInputElement,
   description: HTMLInputElement, neighborhood: HTMLInputElement, title: HTMLInputElement, selectCity: MatSelect, selectDistrict: MatSelect){
    this.showSpinner(SpinnerType.SquareJellyBox);
    const token: string = localStorage.getItem("refreshToken");
  
  this.currentUser = await this.userService.getUserByToken(token);

  const create_address : Create_Address = new Create_Address();
  create_address.name = name.value;
  create_address.surname = surname.value;
  create_address.phone = phone.value;
  create_address.description = description.value;
  create_address.neighborhood = neighborhood.value;
  create_address.title = title.value;
  create_address.selectCity = selectCity.value;
  create_address.selectDistrict = selectDistrict.value;
  create_address.userId = this.currentUser.userId;
  await this.addressService.create(create_address, () => this.hideSpinner(SpinnerType.SquareJellyBox) , errorMessage => this.alertifyService.message(errorMessage, {
    dismissOthers: true,
    messageType: MessageType.Error,
    position: Position.TopRight
  }));
  this.toastrService.message("Adres Eklenmiştir!", "Yeni Adres Oluşturuldu!", {
    messageType: ToastrMessageType.Success,
    position: ToastrPosition.TopRight
  })
  this.router.navigate(["/my-account/address-info"]);
  

  }


 


  
   

    
  }
  
  




