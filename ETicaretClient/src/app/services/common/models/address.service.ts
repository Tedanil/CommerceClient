import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, observable, Observable } from 'rxjs';
import { Address_Info } from 'src/app/contracts/address/address_info';
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

  async getAddressInfo(userId : string, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{infos: Address_Info[] }> {
    const promiseData: Promise<{infos: Address_Info[]}> = this.httpCLientService.get< {infos: Address_Info[]}>({
      controller: "address",
      action: "getaddressinfo"
     
      

    },userId).toPromise();

    promiseData.then(d => successCallBack())
       .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message));
       
       
    return await promiseData;
  }

  async getSingleAddress(Id : string, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{singleAddressInfo: Address_Info }> {
    const promiseData: Promise<{singleAddressInfo: Address_Info}> = this.httpCLientService.get< {singleAddressInfo: Address_Info}>({
      controller: "address",
      action: "getsingleaddress"
     
      

    },Id).toPromise();
    

    promiseData.then(d => successCallBack())
       .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message));
       
       
    return await promiseData;
    
    
  }

  async delete(id: string) {
    const deleteObservable: Observable<any> = this.httpCLientService.delete<any>({
      controller: "address"
    }, id);

      await firstValueFrom(deleteObservable);
  }
}
