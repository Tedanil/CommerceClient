import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { BasketItemDeleteState, BasketItemRemoveDialogComponent } from 'src/app/dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { List_Basket_Item } from '../../../contracts/basket/list_basket_item';
import { Update_Basket_Item } from '../../../contracts/basket/update_basket_item';
import { Create_Order } from '../../../contracts/order/create_order';
import { BasketService } from '../../../services/common/models/basket.service';
import { OrderService } from '../../../services/common/models/order.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/custom-toastr.service';

declare var $: any;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private basketService: BasketService, private orderService: OrderService, private toastrService: CustomToastrService, private router: Router,
    private dialogService: DialogService) {
    super(spinner)
  }
  basketItems: List_Basket_Item[];

  async ngOnInit(): Promise<void> {
    this.showSpinner(SpinnerType.SquareLoader)
    this.basketItems = await this.basketService.get()
    this.hideSpinner(SpinnerType.SquareLoader)
  }

  async changeQuantity(object: any) {
    this.showSpinner(SpinnerType.SquareLoader)
    const basketItemId: string = object.target.attributes["id"].value;
    const quantity: number = object.target.value;
    const basketItem: Update_Basket_Item = new Update_Basket_Item();
    basketItem.basketItemId = basketItemId;
    basketItem.quantity = quantity;
    await this.basketService.updateQuantity(basketItem);
    this.hideSpinner(SpinnerType.SquareLoader)
  }
  removeBasketItem(basketItemId: string) {
    $("#basketModal").modal("hide");

    this.dialogService.openDialog({
      componentType: BasketItemRemoveDialogComponent,
      data: BasketItemDeleteState.Yes,
      afterClosed: async () => {
        this.showSpinner(SpinnerType.SquareLoader);
        await this.basketService.remove(basketItemId);

        var a = $("." + basketItemId)
        $("." + basketItemId).fadeOut(500, () => this.hideSpinner(SpinnerType.SquareLoader));
        $("basketModal").modal("show");
      }
    });
  }

  async shoppingComplete() {
    this.showSpinner(SpinnerType.SquareLoader);
    const order: Create_Order = new Create_Order();
    order.address = "Yenimahalle";
    order.description = "Falanca filanca...";
    await this.orderService.create(order);
    this.hideSpinner(SpinnerType.SquareLoader);
    this.toastrService.message("Sipariş alınmıştır!", "Sipariş Oluşturuldu!", {
      messageType: ToastrMessageType.Info,
      position: ToastrPosition.TopRight
    })
    this.router.navigate(["/"]);
  }



}
