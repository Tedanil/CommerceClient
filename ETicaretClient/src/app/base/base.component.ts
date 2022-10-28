import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Create_Basket_Item } from '../contracts/basket/create_basket_item';
import { List_Product } from '../contracts/list_product';
import { BasketService } from '../services/common/models/basket.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../services/ui/custom-toastr.service';


export class BaseComponent  {

  constructor(private spinner: NgxSpinnerService){}


    showSpinner(spinnerNameType: SpinnerType) {
      this.spinner.show(spinnerNameType);

      //setTimeout(() => this.hideSpinner(spinnerNameType), 1200)
    }

    hideSpinner(spinnerNameType: SpinnerType) {
      this.spinner.hide(spinnerNameType)
    }

   
}

export enum SpinnerType {

  SquareLoader = "s1",
  BallScaleMultiple = "s2",
  Pacman = "s3",
  BallSpinClockwiseFadeRotating = "s4",
  BallElasticDot = "s5",
  SquareJellyBox = "s6"



}

