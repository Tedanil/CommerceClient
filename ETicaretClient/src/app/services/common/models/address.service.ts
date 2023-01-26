import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, observable, Observable } from 'rxjs';
import { Create_Address } from 'src/app/contracts/address/create_address';
import { List_City } from 'src/app/contracts/address/list_city';
import { List_District } from 'src/app/contracts/address/list_district';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpCLientService: HttpClientService) { }

  async create(address: Create_Address, successCallBack?: () => void, errorCallBack?: (error) => void): Promise<void> {
    const observable: Observable<any> = this.httpCLientService.post({
      controller: "address"
    }, address);

    const promiseData =  firstValueFrom(observable);
    promiseData.then(successCallBack)
    .catch(errorCallBack);

   return await promiseData ;
  }
  async getCities( successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{cities: List_City[] }> {
    const promiseData: Promise<{cities: List_City[] }> = this.httpCLientService.get< {cities: List_City[] }>({
      controller: "address",
     
      

    },).toPromise();

    promiseData.then(d => successCallBack())
       .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message));
       
       
    return await promiseData;
  }

  async getDistricts(cityId : any, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{districts: List_District[] }> {
    const promiseData: Promise<{districts: List_District[] }> = this.httpCLientService.get< {districts: List_District[] }>({
      controller: "address",
      action: "getdistricts"
     
      

    },cityId).toPromise();

    promiseData.then(d => successCallBack())
       .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message));
       
       
    return await promiseData;
  }
}
