import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { BasketsModule } from './baskets/baskets.module';
import { RegisterComponent } from './register/register.component';
import { RegisterModule } from './register/register.module';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { UpdatePasswordModule } from './update-password/update-password.module';
import { LayoutModule } from './my-account/layout/layout.module';
import { AccountComponentsModule } from './my-account/components/account-components.module';
import { ProductDetailModule } from './product-detail/product-detail.module';
import { PaymentModule } from './payment/payment.module';
import { ProductSearchModule } from './product-search/product-search.module';
import { OrderDetailModule } from './order-detail/order-detail.module';







@NgModule({
  declarations: [

  
    
  ],
  imports: [
    CommonModule,
    ProductsModule,
    HomeModule,
    BasketsModule,
    RegisterModule,
    //LoginModule,
    PasswordResetModule,
    UpdatePasswordModule,
    LayoutModule,
    AccountComponentsModule,
    ProductDetailModule,
    PaymentModule,
    ProductSearchModule,
    OrderDetailModule
    
    
    
    
    
    
   
    
    
    
  ],
  exports: [
    BasketsModule,
    LayoutModule,
    
    
  ]
})
export class ComponentsModule { }
