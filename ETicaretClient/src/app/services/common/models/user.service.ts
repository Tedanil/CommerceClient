import { Token } from '../../../contracts/token/token';
import { Injectable } from '@angular/core';
import { firstValueFrom, observable, Observable } from 'rxjs';
import { Create_User } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entities/user';
import { Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { User_Response } from 'src/app/contracts/users/user_response';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) { }


  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({
      controller: "users"
    }, user);

    return await firstValueFrom(observable) as Create_User;
    debugger
  }
  async updatePassword(userId: string, resetToken: string, password: string, passwordConfirm: string, successCallBack?: () => void, errorCallBack?: (error) => void) {
    const observable: Observable<any> = this.httpClientService.post({
      action: "update-password",
      controller: "users"
    }, {
      userId: userId,
      resetToken: resetToken,
      password: password,
      passwordConfirm: passwordConfirm
    });

    const promiseData: Promise<any> = firstValueFrom(observable);
    promiseData.then(value => successCallBack()).catch(error => errorCallBack(error));
    await promiseData;
  }
  async getUserByToken(refreshToken: string): Promise<any> {
    
    const observable: Observable<any | User_Response> = this.httpClientService.post({
      controller: "users",
      action: "getuser"
    }, {refreshToken});
   
    

    const userData: User_Response = await firstValueFrom(observable);
    return userData;
    
    

  
  }


}