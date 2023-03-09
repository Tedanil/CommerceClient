import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import { AuthService } from './services/common/auth.service';
import { ComponentType, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { BasketService } from './services/common/models/basket.service';
import { List_Basket_Item } from './contracts/basket/list_basket_item';
import { DialogService } from './services/common/dialog.service';
import { CookiePolicyDialogComponent } from './dialogs/cookie-policy-dialog/cookie-policy-dialog.component';


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
     private basketService: BasketService, private dialogService: DialogService,) {
    authService.identityCheck();   
  }
  showCookieBanner: boolean = false;
  ngOnInit() {
    const hasAcceptedCookies = localStorage.getItem('hasAcceptedCookies');
    if (!hasAcceptedCookies) {
      this.showCookieBanner = true;
    }
  }

  

  searchProducts(searchValue: HTMLInputElement) {
    this.router.navigateByUrl(`productSearch/${searchValue.value}`);
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

  acceptCookies() {
    localStorage.setItem('hasAcceptedCookies', 'true');
    this.showCookieBanner = false;
  }

  showPolicy(){
    this.dialogService.openDialog({
      componentType: CookiePolicyDialogComponent,
     
      options: {
        width: "750px",
        
        
      }
    });
  }
}




