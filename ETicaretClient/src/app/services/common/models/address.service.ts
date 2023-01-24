import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_Address } from 'src/app/contracts/address/create_address';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpCLientService: HttpClientService) { }

  async create(address: Create_Address): Promise<void> {
    const observable: Observable<any> = this.httpCLientService.post({
      controller: "address"
    }, address);

    await firstValueFrom(observable);
  }
}
