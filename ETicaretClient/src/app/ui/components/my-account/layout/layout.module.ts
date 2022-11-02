import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent2 } from './layout.component2';
import { ComponentsModule } from './components/components.module';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';



@NgModule({
  declarations: [
    LayoutComponent2
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    MatSidenavModule
  ],
  exports:[
    LayoutComponent2
  ]
})
export class LayoutModule { }
