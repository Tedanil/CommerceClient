import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { AuthGuard } from './guards/common/auth.guard';
import { HomeComponent } from './ui/components/home/home.component';
import { LayoutComponent2 } from './ui/components/my-account/layout/layout.component2';
import { CategoryListComponent } from './ui/components/products/category-list/category-list.component';


const routes: Routes = [
  {
    path: "admin", component: LayoutComponent, children: [
      { path: "", component: DashboardComponent, canActivate: [AuthGuard] },
      { path: "customers", loadChildren: () => import("./admin/components/customer/customer.module").then(module => module.CustomerModule), canActivate: [AuthGuard] },
      { path: "products", loadChildren: () => import("./admin/components/products/products.module").then(module => module.ProductsModule), canActivate: [AuthGuard] },
      { path: "orders", loadChildren: () => import("./admin/components/order/order.module").then(module => module.OrderModule), canActivate: [AuthGuard] },
      { path: "authorize-menu", loadChildren: () => import("./admin/components/authorize-menu/authorize-menu.module").then(module => module.AuthorizeMenuModule), canActivate: [AuthGuard] },
      { path: "roles", loadChildren: () => import("./admin/components/role/role.module").then(module => module.RoleModule), canActivate: [AuthGuard] },
      { path: "users", loadChildren: () => import("./admin/components/user/user.module").then(module => module.UserModule), canActivate: [AuthGuard] },
    ], canActivate: [AuthGuard] 
  },
  { path: "", component: HomeComponent },
  { path: "basket", loadChildren: () => import("./ui/components/baskets/baskets.module").then(module => module.BasketsModule) },
  { path: "products", loadChildren: () => import("./ui/components/products/products.module").then(module => module.ProductsModule) },
  //{ path: "products/:pageNo", loadChildren: () => import("./ui/components/products/products.module").then(module => module.ProductsModule) },
  //{ path: "products/:id", pathMatch:"full", component: ProductDetailComponent,  },
  { path: "products/:categoryName", loadChildren: () => import("./ui/components/products/products.module").then(module => module.ProductsModule) },
  { path: "productDetail/:id", loadChildren: () => import("./ui/components/product-detail/product-detail.module").then(module => module.ProductDetailModule) },
  { path: "register", loadChildren: () => import("./ui/components/register/register.module").then(module => module.RegisterModule) },
  { path: "login", loadChildren: () => import("./ui/components/login/login.module").then(module => module.LoginModule) },
  { path: "password-reset", loadChildren: () => import("./ui/components/password-reset/password-reset.module").then(module => module.PasswordResetModule) },
  { path: "update-password/:userId/:resetToken", loadChildren: () => import("./ui/components/update-password/update-password.module").then(module => module.UpdatePasswordModule) },

  {path: "my-account", component:LayoutComponent2, children: [
    {path: "my-orders", loadChildren: () => import("./ui/components/my-account/components/my-orders/my-orders.module").then(module => module.MyOrdersModule), canActivate: [AuthGuard]},
    {path: "user-info", loadChildren: () => import("./ui/components/my-account/components/user-info/user-info.module").then(module => module.UserInfoModule), canActivate: [AuthGuard]},
    {path: "address-info", loadChildren: () => import("./ui/components/my-account/components/address-info/address-info.module").then(module => module.AddressInfoModule), canActivate: [AuthGuard]},


  ]}
  

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
