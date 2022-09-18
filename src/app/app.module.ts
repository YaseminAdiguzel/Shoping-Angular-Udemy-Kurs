import { AppComponent } from './app.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DeleteDialogComponent, HomeComponent, PaymentDialogComponent } from './components/home/home.component';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { OrderComponent } from './components/order/order.component';
import { FilterProductPipe } from './pipe/filter-product.pipe';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { AuthInterceptor } from './components/interceptors/auth.interceptor';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavbarComponent,
    HomeComponent,
    DeleteDialogComponent,
    PaymentDialogComponent,
    OrderComponent,
    FilterProductPipe,
    LoginComponent,
    ProductComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    HttpClientModule,
    MatTableModule,
    MatSnackBarModule,
    NgxSpinnerModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: "apiUrl", useValue:"https://webapi.angulareducation.com/api/"},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
