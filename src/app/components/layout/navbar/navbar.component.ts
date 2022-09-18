import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterContentChecked {

  isAuth:boolean = false;

  constructor(
    private authService:AuthService
  ) {}

  ngOnInit(): void {

  }

  ngAfterContentChecked(): void {
    this.isAuth = this.authService.isAuthenticated();
  }

  logout(){
    this.authService.logout();
  }

}
