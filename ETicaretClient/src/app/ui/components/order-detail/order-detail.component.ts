import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { SingleOrder } from 'src/app/contracts/order/single_order';
import { OrderService } from 'src/app/services/common/models/order.service';
import { CustomToastrService } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService,private activatedRoute: ActivatedRoute,
    private orderService: OrderService, private customToastrService: CustomToastrService)
   {super(spinner)}

   orderId: string;
   singleOrder: SingleOrder;
   displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice'];
   dataSource = [];
   totalPrice: number;
   clickedRows = new Set<any>();

 async ngOnInit() {

  this.activatedRoute.params.subscribe(async params => {
    this.orderId =  params["orderId"] ;

    this.singleOrder = await this.orderService.getOrderById(this.orderId as string)

    this.dataSource = this.singleOrder.basketItems;

    this.totalPrice = this.singleOrder.basketItems.map((basketItem, index) =>
     basketItem.price * basketItem.quantity).reduce((price, current) => price + current);

     

  });

}

}
