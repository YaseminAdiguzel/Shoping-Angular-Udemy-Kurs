import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrderComponent } from './components/order/order.component';
import { ProductComponent } from './components/product/product.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path: '', component:LayoutComponent, children: [
    {path: '', component:HomeComponent},
    {path: 'order', component:OrderComponent},
    {path: 'login', component:LoginComponent},
    {path: 'product', component:ProductComponent, canActivate: [AuthGuard]},
    {path: 'product/:value', component:ProductComponent, canActivate: [AuthGuard]},
  ]},
  {path: '**', component:NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
