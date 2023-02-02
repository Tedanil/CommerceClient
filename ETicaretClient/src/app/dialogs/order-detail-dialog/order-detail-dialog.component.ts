import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { NgxSpinnerService } from 'ngx-spinner';
import { async } from 'rxjs';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { AuthService } from 'src/app/services/common/auth.service';
import { SpinnerType } from '../../base/base.component';
import { SingleOrder } from '../../contracts/order/single_order';
import { DialogService } from '../../services/common/dialog.service';
import { OrderService } from '../../services/common/models/order.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/custom-toastr.service';
import { BaseDialog } from '../base/base-dialog';
import { CompleteOrderDialogComponent, CompleteOrderState } from '../complete-order-dialog/complete-order-dialog.component';
import { UpdateOrderState, UpdateOrderStatusDialogComponent } from '../update-order-status-dialog/update-order-status-dialog.component';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.scss']
})
export class OrderDetailDialogComponent extends BaseDialog<OrderDetailDialogComponent> implements OnInit {

  constructor(
    dialogRef: MatDialogRef<OrderDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState | string,
    private orderService: OrderService,
    private dialogService: DialogService,
    private spinner: NgxSpinnerService,
    private toastrService: CustomToastrService,
    private alertifyService: AlertifyService,
    public authService: AuthService) {
    super(dialogRef)
  }

  singleOrder: SingleOrder;
  selectedOrderStatus:string; 
  orderStatuses: any;

  displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice'];
  dataSource = [];
  clickedRows = new Set<any>();
  totalPrice: number;
  

  async ngOnInit(): Promise<void> {
    this.authService.adminCheck();
    
    this.orderStatuses = Object.values(OrderStatus);
    
    this.singleOrder = await this.orderService.getOrderById(this.data as string)
    
    const orderStatusArray = Object.values(OrderStatus);
    
    this.selectedOrderStatus = orderStatusArray[this.singleOrder.status];
    
    
    
    
    this.dataSource = this.singleOrder.basketItems;

    this.totalPrice = this.singleOrder.basketItems.map((basketItem, index) => basketItem.price * basketItem.quantity).reduce((price, current) => price + current);
  }

  getTurkishStatus(selectedOrderStatus: string) {
    switch (selectedOrderStatus) {
      case "Received":
        return 'Sipariş Alındı';
      case "InPreparation":
        return 'Sipariş Hazırlanıyor';
      case "Shipped":
        return 'Kargoya Verildi';
      case "Delivered":
        return 'Teslim Edildi';
      default:
        return 'Bilinmiyor';
    }
  }
 

  completeOrder() {
    this.dialogService.openDialog({
      componentType: CompleteOrderDialogComponent,
      data: CompleteOrderState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.BallScaleMultiple)
        await this.orderService.completeOrder(this.data as string);
        this.spinner.hide(SpinnerType.BallScaleMultiple)
        this.toastrService.message("Sipariş başarıyla tamamlanmıştır! Müşteriye bilgi verilmiştir.", "Sipariş Tamamlandı!", {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight
        });
      }
    });
  }

  async updateOrderStatus(selectStatus: HTMLSelectElement) {
    
    this.dialogService.openDialog({
      componentType: UpdateOrderStatusDialogComponent,
      data: UpdateOrderState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.SquareJellyBox)
        await this.orderService.updateOrderStatus(this.data as string, selectStatus.value, () => this.spinner.hide(SpinnerType.SquareJellyBox),  
        );
        this.toastrService.message("Sipariş Durumu Güncellenmiştir!", "Sipariş Durumu Başarıyla Güncellendi!", {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight
        })
         this.ngOnInit();
      }
    });
  }



}


export enum OrderDetailDialogState {
  Close, OrderComplete
}

export enum OrderStatus {
  Received = 'Received',
  InPreparation = 'InPreparation',
  Shipped = 'Shipped',
  Delivered = 'Delivered'
}