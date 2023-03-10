import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Address_Info } from 'src/app/contracts/address/address_info';
import { List_Basket_Item } from 'src/app/contracts/basket/list_basket_item';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { User_Response } from 'src/app/contracts/users/user_response';
import { ConditionsDialogComponent } from 'src/app/dialogs/conditions-dialog/conditions-dialog.component';
import { PreInformationDialogComponent } from 'src/app/dialogs/pre-information-dialog/pre-information-dialog.component';
import { PrivacyPolicyDialogComponent } from 'src/app/dialogs/privacy-policy-dialog/privacy-policy-dialog.component';
import { ShoppingCompleteDialogComponent, ShoppingCompleteState } from 'src/app/dialogs/shopping-complete-dialog/shopping-complete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { AddressService } from 'src/app/services/common/models/address.service';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';



@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent extends BaseComponent implements OnInit {


  constructor(spinner: NgxSpinnerService,
    private alertifyService: AlertifyService,
    private userService: UserService,
    private addressService: AddressService,
    private toastrService: CustomToastrService,
    private router: Router,
    private dialogService: DialogService,
    private orderService: OrderService,
    private basketService: BasketService

  ) {
    super(spinner)
  }


  currentUser: User_Response;
  infos: Address_Info[]
  addressId: string;
  basketItems: List_Basket_Item[];
  isAccepted: boolean = false;







  async ngOnInit() {
    this.showSpinner(SpinnerType.BallElasticDot);
    this.basketItems = await this.basketService.get()

    const token: string = localStorage.getItem("refreshToken");

    this.currentUser = await this.userService.getUserByToken(token);


    const allInfos: { infos: Address_Info[] } = await this.addressService.getAddressInfo(this.currentUser.userId, () => this.hideSpinner(SpinnerType.BallElasticDot), errorMessage => this.alertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    }));
    this.infos = allInfos.infos
    console.log(this.infos)
    this.addressId = this.infos.find(a => a.showcase).id;




  }
  showCase(id: string) {
    this.showSpinner(SpinnerType.SquareJellyBox);

    this.addressService.changeShowcaseAddress(id, this.currentUser.userId, () => {
      this.hideSpinner(SpinnerType.SquareJellyBox);
      this.ngOnInit();


    });
  }

  shoppingComplete() {
    if (!this.isAccepted) {
      this.toastrService.message("Lütfen Satış Sözleşmesini Okuyun ve Onaylayın", "Satış Sözleşmesi", {
        messageType: ToastrMessageType.Info,
        position: ToastrPosition.TopRight
      })
      return;
    }


    this.dialogService.openDialog({
      componentType: ShoppingCompleteDialogComponent,
      options: {
        height: "200px"
      },

      data: ShoppingCompleteState.Yes,
      

      afterClosed: async () => {
        this.showSpinner(SpinnerType.SquareLoader);
        const order: Create_Order = new Create_Order();
        order.address = this.addressId as string;
        order.description = "Falanca filanca...";
        await this.orderService.create(order);
        this.hideSpinner(SpinnerType.SquareLoader);
        this.toastrService.message("Sipariş alınmıştır!", "Sipariş Oluşturuldu!", {
          messageType: ToastrMessageType.Info,
          position: ToastrPosition.TopRight
        })
        this.router.navigate(["/"]);

      }
      
    });
    



  }


  showPolicy() {
    this.dialogService.openDialog({
      componentType: PrivacyPolicyDialogComponent,

      options: {
        width: "750px",


      }
    });
  }


  showConditions() {
    this.dialogService.openDialog({
      componentType: ConditionsDialogComponent,

      options: {
        width: "750px"
      }
    });
  }

  showPreInformation(){
    this.dialogService.openDialog({
      componentType: PreInformationDialogComponent,

      options: {
        width: "750px"
      }
    });
  }





}

