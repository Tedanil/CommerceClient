import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BaseComponent } from './base/base.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DeleteDirective } from './directives/admin/delete.directive';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { FileUploadComponent } from './services/common/file-upload/file-upload.component';
import { FileUploadDialogComponent } from './dialogs/file-upload-dialog/file-upload-dialog.component';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './ui/components/login/login.component';
import { FacebookLoginProvider, GoogleLoginProvider,SocialAuthServiceConfig,SocialLoginModule} from '@abacritt/angularx-social-login';
import { RouterModule } from '@angular/router';
import { HttpErrorHandlerInterceptionService } from './services/common/http-error-handler-interception.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent, LoginComponent, DynamicLoadComponentDirective
    
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule, UiModule, BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem("accessToken"),
        allowedDomains: ["localhost:7249"]
      }
    }),
    SocialLoginModule,
    MatIconModule, MatBadgeModule, MatButtonModule
   

  ],
  providers: [{provide:"baseUrl", useValue: "https://localhost:7249/api", multi: true},
  { provide: "baseSignalRUrl", useValue: "https://localhost:7249/", multi: true },
  {
    provide: "SocialAuthServiceConfig",
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("459574702655-m7cdesbsfi14e1u2vrvsuqhhgi6shdc6.apps.googleusercontent.com")
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("613848920220927")
        }
      ],
      onError: err => console.log(err)
    } as SocialAuthServiceConfig
  },
  {provide:HTTP_INTERCEPTORS, useClass:HttpErrorHandlerInterceptionService, multi: true}
],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
