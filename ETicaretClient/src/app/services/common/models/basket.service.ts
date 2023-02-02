import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, Subject } from 'rxjs';
import { Create_Basket_Item } from '../../../contracts/basket/create_basket_item';
import { List_Basket_Item } from '../../../contracts/basket/list_basket_item';
import { Update_Basket_Item } from '../../../contracts/basket/update_basket_item';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  constructor(private httpClientService: HttpClientService) { }


  //The method for dynamically displaying the number of product types in the basket
  // is implemented in the addToBasket and removeFromBasket methods and is updated
  // in app.ts by calling ngOnInit and refreshing the page.
  private reloadSubject = new Subject<void>();
  reload$ = this.reloadSubject.asObservable();
  reload() {
    this.reloadSubject.next();
  }

  async get(): Promise<List_Basket_Item[]> {
    const observable: Observable<List_Basket_Item[]> = this.httpClientService.get({
      controller: "baskets",
    });

    return await firstValueFrom(observable);
  }

  async add(basketItem: Create_Basket_Item): Promise<void> {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "baskets"
    }, basketItem);

    await firstValueFrom(observable);
  }

  async updateQuantity(basketItem: Update_Basket_Item): Promise<void> {
    const observable: Observable<any> = this.httpClientService.put({
      controller: "baskets"
    }, basketItem)

    await firstValueFrom(observable);
  }

  async remove(basketItemId: string) {
    const observable: Observable<any> = this.httpClientService.delete({
      controller: "baskets"
    }, basketItemId);

    await firstValueFrom(observable);
  }
}
