import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { List_Order } from 'src/app/contracts/order/list_order';
import { Create_Order } from '../../../contracts/order/create_order';
import { HttpClientService } from '../http-client.service';
import { SingleOrder } from '../../../contracts/order/single_order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpCLientService: HttpClientService) { }

  async create(order: Create_Order): Promise<string> {
    const observable: Observable<any> = this.httpCLientService.post({
      controller: "orders"
    }, order);

     const response = await firstValueFrom(observable);
     return response.id;
     
  }

  async getAllOrders(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalOrderCount: number; orders: List_Order[] }> {
    const observable: Observable<{ totalOrderCount: number; orders: List_Order[] }> = this.httpCLientService.get({
      controller: "orders",
      queryString: `page=${page}&size=${size}`
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack())
      .catch(error => errorCallBack(error));

    return await promiseData;
  }
  async getOrdersByUser(page: number = 0, size: number = 5, userName: string, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalOrderCount: number; orders: List_Order[] }> {
    const observable: Observable<{ totalOrderCount: number; orders: List_Order[] }> = this.httpCLientService.get({
      controller: "orders",
      action: "getordersbyusername",
      queryString: `page=${page}&size=${size}&userName=${userName}`
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack())
      .catch(error => errorCallBack(error));

    return await promiseData;
  }
  async getOrderById(id: string, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    const observable: Observable<SingleOrder> = this.httpCLientService.get<SingleOrder>({
      controller: "orders"
    }, id);

    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack())
      .catch(error => errorCallBack(error))

    return await promiseData;
  }
  async completeOrder(id: string){
    const observable: Observable<any> = this.httpCLientService.get({
      controller: "orders",
      action: "complete-order"
    }, id);

    await firstValueFrom(observable);
  }

  async updateOrderStatus(id: string, selectStatus: any, successCallBack?: () => void): Promise<void> {
    const updateOrderStatusObservable = this.httpCLientService.get({
      controller: "orders",
      action: "updateorderstatus",
      queryString: `id=${id}&selectStatus=${selectStatus}`
    });
    await firstValueFrom(updateOrderStatusObservable);
    successCallBack();
}
}
