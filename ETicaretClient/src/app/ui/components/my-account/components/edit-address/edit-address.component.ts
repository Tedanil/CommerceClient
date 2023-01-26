import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Address_Info } from 'src/app/contracts/address/address_info';
import { Create_Address } from 'src/app/contracts/address/create_address';
import { List_City } from 'src/app/contracts/address/list_city';
import { List_District } from 'src/app/contracts/address/list_district';
import { Update_Address } from 'src/app/contracts/address/update_address';
import { User_Response } from 'src/app/contracts/users/user_response';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { AddressService } from 'src/app/services/common/models/address.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent extends BaseComponent implements OnInit {
  

  constructor(spinner:NgxSpinnerService, 
    private alertifyService: AlertifyService,
     private userService: UserService,
     private addressService: AddressService,
     private toastrService: CustomToastrService,
     private router: Router,
     private activatedRoute: ActivatedRoute
     
    
    ) {
    super(spinner)
   }
  
   @ViewChild('selectCity') selectCity: any;
   selectedCityId: number;
   currentUser : User_Response;
   cities2 : List_City[];
   districts2: List_District[];
   singleAddressInfo:Address_Info;
   id: string;
   
   
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

    this.activatedRoute.params.subscribe(async params => {
      this.id = params["id"];
    const allInfos: {singleAddressInfo:Address_Info} = await this.addressService.getSingleAddress(this.id as string,() => this.hideSpinner(SpinnerType.BallElasticDot), errorMessage => this.alertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    }));
    this.singleAddressInfo = allInfos.singleAddressInfo   
  });

  }
  
 async update(name:HTMLInputElement, surname: HTMLInputElement, phone:HTMLInputElement,
   description: HTMLInputElement, neighborhood: HTMLInputElement, title: HTMLInputElement, selectCity: MatSelect, selectDistrict: MatSelect){
    this.showSpinner(SpinnerType.SquareJellyBox);
    const token: string = localStorage.getItem("refreshToken");
  
  this.currentUser = await this.userService.getUserByToken(token);

  const update_address : Update_Address = new Update_Address();
  update_address.name = name.value;
  update_address.surname = surname.value;
  update_address.phone = phone.value;
  update_address.description = description.value;
  update_address.neighborhood = neighborhood.value;
  update_address.title = title.value;
  update_address.selectCity = selectCity.value;
  update_address.selectDistrict = selectDistrict.value;
  update_address.userId = this.currentUser.userId;
  update_address.id = this.id;
  await this.addressService.update(update_address, () => this.hideSpinner(SpinnerType.SquareJellyBox) , errorMessage => this.alertifyService.message(errorMessage, {
    dismissOthers: true,
    messageType: MessageType.Error,
    position: Position.TopRight
  }));
  this.toastrService.message("Adres Güncellenmiştir!", "Adres Başarıyla Güncellendi!", {
    messageType: ToastrMessageType.Success,
    position: ToastrPosition.TopRight
  })
  this.router.navigate(["/my-account/address-info"]);
  

  }


 


  
   

    
  }
  
  




