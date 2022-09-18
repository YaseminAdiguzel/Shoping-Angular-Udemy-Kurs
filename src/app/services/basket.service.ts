import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BasketModel } from '../models/basketModel';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(
    @Inject("apiUrl") private apiUrl:string,
    private httpClient:HttpClient
  ) { }

  getList(){
    let api = this.apiUrl + "baskets/getlist";
    return this.httpClient.get(api);
  }

  add(basketModel:BasketModel){
    let api = this.apiUrl + "baskets/add";
    return this.httpClient.post(api,basketModel);
  }

  update(basketModel:BasketModel){
    let api = this.apiUrl + "baskets/update";
    return this.httpClient.post(api,basketModel);
  }

  delete(basketModel:BasketModel){
    let api = this.apiUrl + "baskets/delete";
    return this.httpClient.post(api,basketModel);
  }
}
