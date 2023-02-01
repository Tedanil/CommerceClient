import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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


  constructor(spinner: NgxSpinnerService,
    private alertifyService: AlertifyService,
    private userService: UserService,
    private addressService: AddressService,
    private toastrService: CustomToastrService,
    private router: Router,
    private formBuilder: FormBuilder


  ) {
    super(spinner)
  }

  @ViewChild('selectCity') selectCity: any;
  selectedCityId: number;
  currentUser: User_Response;
  cities2: List_City[];
  districts2: List_District[];
  frm: FormGroup;
  submitted: boolean = false;



  async onSelectChange(event) {
    this.selectedCityId = event.value;
    this.showSpinner(SpinnerType.BallElasticDot);
    const allDistricts: { districts: List_District[] } = await this.addressService.getDistricts(this.selectedCityId as number, () => this.hideSpinner(SpinnerType.BallElasticDot), errorMessage => this.alertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    }));
    this.districts2 = allDistricts.districts

  }

  async ngOnInit() {
    this.frm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      surname: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      phone: ["", [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      selectCity: ["", [Validators.required]],
      selectDistrict: ["", [Validators.required]],
      neighborhood: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      description: ["", [Validators.required, Validators.maxLength(200), Validators.minLength(3)]],
      title: ["", [Validators.required, Validators.maxLength(25), Validators.minLength(1)]],



    }

    )
    this.showSpinner(SpinnerType.BallElasticDot);



    const allCities: { cities: List_City[] } = await this.addressService.getCities(() => this.hideSpinner(SpinnerType.BallElasticDot), errorMessage => this.alertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    }));
    this.cities2 = allCities.cities






  }

  get component() {
    return this.frm.controls;
  }

  async create(create_address: Create_Address) {
    this.submitted = true;
    this.showSpinner(SpinnerType.SquareJellyBox);
    const token: string = localStorage.getItem("refreshToken");

    this.currentUser = await this.userService.getUserByToken(token);


    create_address.userId = this.currentUser.userId;
    if (this.frm.invalid)
      return;

    await this.addressService.create(create_address, () => this.hideSpinner(SpinnerType.SquareJellyBox), errorMessage => this.alertifyService.message(errorMessage, {
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






