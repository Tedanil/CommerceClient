import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { async } from 'rxjs';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/common/auth.service';
import { List_Basket_Item } from '../../../contracts/basket/list_basket_item';
import { Update_Basket_Item } from '../../../contracts/basket/update_basket_item';
import { Create_Order } from '../../../contracts/order/create_order';
import { BasketItemDeleteState, BasketItemRemoveDialogComponent } from '../../../dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import { ShoppingCompleteDialogComponent, ShoppingCompleteState } from '../../../dialogs/shopping-complete-dialog/shopping-complete-dialog.component';
import { DialogService } from '../../../services/common/dialog.service';
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

  constructor(spinner: NgxSpinnerService, private basketService: BasketService, private orderService: OrderService,
     private toastrService: CustomToastrService, private router: Router, private dialogService: DialogService,
     ) {
    super(spinner)
  }

  basketItems: List_Basket_Item[];

  async ngOnInit(): Promise<void> {
    
    this.showSpinner(SpinnerType.SquareLoader)
    this.basketItems = await this.basketService.get()
    this.hideSpinner(SpinnerType.SquareLoader)
  }

  getBasketTotal(): number {
    let total = 0;
    this.basketItems.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  }

  async changeQuantity(object: any) {
    this.showSpinner(SpinnerType.SquareLoader)
    const basketItemId: string = object.target.attributes["id"].value;
    let quantity: number = parseInt(object.target.value);
  
  // Check if quantity is valid
  if (quantity <= 0) {
    this.toastrService.message("Lütfen geçerli bir adet giriniz!", "Hata! ", {
      messageType: ToastrMessageType.Error,
      position: ToastrPosition.TopRight
    });
    quantity = 1;
  }
    const basketItem: Update_Basket_Item = new Update_Basket_Item();
    basketItem.basketItemId = basketItemId;
    basketItem.quantity = quantity;
    await this.basketService.updateQuantity(basketItem);
    this.hideSpinner(SpinnerType.SquareLoader)
    this.ngOnInit();
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
        $("#basketModal").modal("show");
      }
    });
  }

  shoppingComplete() {
    $("#basketModal").modal("hide");


        this.router.navigate(["payment"]);
        
        
      }
   

}
