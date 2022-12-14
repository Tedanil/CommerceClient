import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Order } from 'src/app/contracts/order/list_order';
import { User_Response } from 'src/app/contracts/users/user_response';
import { OrderDetailDialogComponent } from 'src/app/dialogs/order-detail-dialog/order-detail-dialog.component';
import { User } from 'src/app/entities/user';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { AuthService } from 'src/app/services/common/auth.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService,
    private orderService: OrderService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService,
    public socialAuthService: SocialAuthService,
    private authService: AuthService,
    private userService: UserService
    ) {
    super(spinner)
   socialAuthService.authState.subscribe(async (user: SocialUser) => {
      console.log(user.name)
    });
    
  }

currentUser : User_Response;

  
  
  
  
  displayedColumns: string[] = ['orderCode', 'userName',  'createdDate', 'totalPrice', 'viewdetail'];
  dataSource: MatTableDataSource<List_Order> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getOrders() {
    this.showSpinner(SpinnerType.SquareLoader);
    const token: string = localStorage.getItem("refreshToken");
  
  this.currentUser = await this.userService.getUserByToken(token);
  console.log(this.currentUser)

    const allOrders: { totalOrderCount: number; orders: List_Order[] } = await this.orderService
    .getAllOrders(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => 
    this.hideSpinner(SpinnerType.SquareLoader), errorMessage => this.alertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    }))

    // this.socialAuthService.authState.subscribe(async (user: SocialUser) => {
    //   console.log(user.email);
    //   allOrders.orders = allOrders.orders.filter(p => p.userName == user.email);

    // });
    
  
   
    allOrders.orders = allOrders.orders.filter(p => p.userName == this.currentUser.username || p.userName == this.currentUser.email);
    
    this.dataSource = new MatTableDataSource<List_Order>(allOrders.orders);
    this.paginator.length = allOrders.totalOrderCount;
  }

  async pageChanged() {
    await this.getOrders();
  }

  async ngOnInit() {
   
    
    await this.getOrders();
    
  }

  showDetail(id: string) {
    this.dialogService.openDialog({
      componentType: OrderDetailDialogComponent,
      data: id,
      options: {
        width: "750px"
      }
    });
  }

}
