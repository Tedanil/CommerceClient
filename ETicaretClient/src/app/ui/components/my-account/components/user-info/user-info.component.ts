import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_User } from 'src/app/contracts/users/create_user';
import { User_Response } from 'src/app/contracts/users/user_response';
import { User } from 'src/app/entities/user';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent extends BaseComponent implements OnInit {

 
  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastrService: CustomToastrService,
    spinner: NgxSpinnerService, private socialAuthService: SocialAuthService, private activatedRoute: ActivatedRoute, private userAuthService: UserAuthService,
    private alertifyService: AlertifyService, private router: Router) {
      super(spinner)
      // socialAuthService.authState.subscribe(async (user: SocialUser) => {
      //   console.log(user)
      // });    
      
      }

  frm: FormGroup;
  state: any;
  userInfo: SocialUser;
  currentUser: User_Response;

  
  
  
 async ngOnInit() {
  const token: string = localStorage.getItem("refreshToken");
  
  this.currentUser = await this.userService.getUserByToken(token);
  console.log(this.currentUser)
  
  
  console.log(this.currentUser.nameSurname)
    // this.frm = this.formBuilder.group({
    //   nameSurname: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(3) ]],
    //   username: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(3) ]],
    //   email: ["", [Validators.required, Validators.maxLength(50), Validators.email ]],
    //   password: ["", [Validators.required] ],
    //   passwordConfirm: ["", [Validators.required]]
    // },
    // this.socialAuthService.authState.subscribe(async (user: SocialUser) => {
    //   console.log(user.email);
    //   this.userInfo = user;
    //   console.log(this.userInfo.email)
    //  })
     

     




    // {
    //   validators: (group: AbstractControl): ValidationErrors | null => {
    //     let password = group.get("password").value;
    //     let passwordConfirm = group.get("passwordConfirm").value;
    //     return password === passwordConfirm ? null : {notSame: true};
    //   }
    // }
//)
// this.showSpinner(SpinnerType.SquareLoader)
// this.activatedRoute.params.subscribe({
//   next: async params => {
//     const userId: string = params["userId"];
//     const resetToken: string = params["resetToken"];
//     this.state = await this.userAuthService.verifyResetToken(resetToken, userId, () => {
//       this.hideSpinner(SpinnerType.SquareLoader);
//     })
//   }
// });
 }

get component() {
  return this.frm.controls;
}
submitted: boolean = false;
async onSubmit(user: User)  {
  this.submitted = true;

 

 

  if (this.frm.invalid)
  return;

 const result: Create_User = await this.userService.create(user);
  
 if(result.succeeded)
     this.toastrService.message(result.message, "Kullanıcı Kaydı Başarılı..!", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
     });
     else
     this.toastrService.message(result.message, "Hata!", {
      messageType: ToastrMessageType.Error,
      position: ToastrPosition.TopRight
   });
   


}
// updatePassword(password: string, passwordConfirm: string) {
//   this.showSpinner(SpinnerType.SquareLoader);
//   if (password != passwordConfirm) {
//     this.alertifyService.message("Şifreleri doğrulayınız!", {
//       messageType: MessageType.Error,
//       position: Position.TopRight
//     });
//     this.hideSpinner(SpinnerType.SquareLoader)
//     return;
//   }

//   this.activatedRoute.params.subscribe({
//     next: async params => {
//       const userId: string = params["userId"];
//       const resetToken: string = params["resetToken"];
//       await this.userService.updatePassword(userId, resetToken, password, passwordConfirm,
//         () => {
//           this.alertifyService.message("Şifre başarıyla güncellenmiştir.", {
//             messageType: MessageType.Success,
//             position: Position.TopRight
//           })
          
//         },
//         error => {
//           console.log(error)
//         });
//       this.hideSpinner(SpinnerType.SquareLoader)
//     }
//   })


// }

}
