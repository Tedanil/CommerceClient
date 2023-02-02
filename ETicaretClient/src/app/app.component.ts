import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import { AuthService } from './services/common/auth.service';
import { ComponentType, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import * as bootstrap from 'bootstrap'
import { UserService } from './services/common/models/user.service';
import { User_Response } from './contracts/users/user_response';
import { identity, Subscription } from 'rxjs';
import { BasketService } from './services/common/models/basket.service';
import { List_Basket_Item } from './contracts/basket/list_basket_item';


declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(DynamicLoadComponentDirective, { static: true })
  dynamicLoadComponentDirective: DynamicLoadComponentDirective;

  constructor(public authService: AuthService, private toastrService: CustomToastrService,
     private router: Router, private dynamicLoadComponentService: DynamicLoadComponentService,
     private basketService: BasketService) {
    authService.identityCheck();   
  }

  basketItems: List_Basket_Item[];
 
private reloadSubscription: Subscription;

 async ngOnInit() {
    this.basketItems = await this.basketService.get();
   
    this.reloadSubscription = this.basketService.reload$.subscribe(() => {
      this.ngOnInit();
    });
  }

 
  ngOnDestroy() {
    this.reloadSubscription.unsubscribe();
  }
  




  

  signOut() {
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.toastrService.message("Oturum kapatılmıştır!", "Oturum Kapatıldı", {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopRight
    });
  }

  loadComponent() {
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketsComponent, this.dynamicLoadComponentDirective.viewContainerRef);
  }

}




