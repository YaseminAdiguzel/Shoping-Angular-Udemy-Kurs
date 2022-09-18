import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BasketPaymentModel } from '../models/basketPaymentModel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    @Inject("apiUrl") private apiUrl:string,
    private httpClient:HttpClient
  ) { }

  getList(){
    let api = this.apiUrl + "Orders/getList";
    return this.httpClient.get(api);
  }

  addPayment(basketPaymentModel:BasketPaymentModel){
    let api = this.apiUrl + "Orders/addPayment";
    return this.httpClient.post(api,basketPaymentModel);
  }


}
