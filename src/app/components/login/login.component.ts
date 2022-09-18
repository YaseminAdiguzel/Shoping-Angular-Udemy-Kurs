import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide:boolean = true;
  constructor(
    private authService:AuthService,
    private snackbar:SnackbarService
  ) { }

  ngOnInit(): void {
  }

  login(form:any){
    if (form.email != "" && form.password != "") {
      this.authService.login(form);
    }else{
      this.snackbar.openSnackBar("Zorunlu alanları doldurun");
    }

  }

}
