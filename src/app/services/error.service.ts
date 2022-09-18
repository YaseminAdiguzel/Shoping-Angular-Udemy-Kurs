import { Injectable } from '@angular/core';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private snackbar:SnackbarService
  ) { }

  errorHandler(error:any){
    if (error.status == 400 || error.status == 401) {
      this.snackbar.openSnackBar(error.error);
    }else{
      this.snackbar.openSnackBar("Bir hata oluştu. Lütfen daha sonra tekrar deneyin");
    }
  }
}
