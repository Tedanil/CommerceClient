import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressInfoModule } from './address-info/address-info.module';
import { MyOrdersModule } from './my-orders/my-orders.module';
import { UserInfoModule } from './user-info/user-info.module';
import { CreateAddressModule } from './create-address/create-address.module';
import { EditAddressModule } from './edit-address/edit-address.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AddressInfoModule,
    MyOrdersModule,
    UserInfoModule,
    CreateAddressModule,
    EditAddressModule
    
  ],
  exports: [
    
  ]
})
export class AccountComponentsModule { }
