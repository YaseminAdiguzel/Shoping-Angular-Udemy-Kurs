import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from './error.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth:boolean = false;

  constructor(
    @Inject("apiUrl") private apiUrl:string,
    private httpClient:HttpClient,
    private router:Router,
    private snackbar:SnackbarService,
    private errorService:ErrorService
  ) { }

  isAuthenticated():boolean{
    if (localStorage.getItem("token")) {
      return true;
    }else{
      return false;
    }
  }

  login(form:any){
    let api = this.apiUrl + "users/login";
    let loginModel: {email: string, password:string};
    loginModel = form;

    this.httpClient.post(api,loginModel).subscribe((res:any)=>{
      localStorage.setItem("token", res.data.token);
      this.isAuth = true;
      this.router.navigate(["/"]);
      return true;
    },(err)=>{
      this.errorService.errorHandler(err);
      return false;
    })
  }

  logout(){
    localStorage.clear();
    this.isAuth = false;
    this.router.navigate(["/"]);
  }

}
