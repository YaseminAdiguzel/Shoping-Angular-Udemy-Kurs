import { AfterContentChecked, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BasketModel } from 'src/app/models/basketModel';
import { ProductModel } from 'src/app/models/productModel';
import { BasketService } from 'src/app/services/basket.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BasketPaymentModel } from 'src/app/models/basketPaymentModel';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentChecked {

  displayedColumns: string[] = ['id', 'name', 'quantity', 'total', "transaction"];
  products: ProductModel[] = []
  baskets: BasketModel[] = [];

  productName:string;
  total:number = 0;

  animal: string;
  name: string;
  isAuth:boolean = false;

  constructor(
    private productService:ProductService,
    private basketService:BasketService,
    private spinner:NgxSpinnerService,
    private snackbar:SnackbarService,
    private authService:AuthService,
    public dialog: MatDialog,
    private orderService:OrderService,
    private errorService:ErrorService
  ) { }

  ngOnInit(): void {
    this.getListProducts();
    this.getListBaskets();
  }

 ngAfterContentChecked(): void {
  this.isAuth = this.authService.isAuthenticated();
 }

  openDeleteDialog(basketModel:BasketModel): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: basketModel,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.deleteBasket(result);
      }
    });
  }



  openPaymentDialog(): void {
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: '600px',
      data: this.baskets,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (result.invalid) {
          this.snackbar.openSnackBar("Zorunlu alanları doldurun");
          return;
        }

        let paymentModel = new BasketPaymentModel();
        paymentModel.payment = result.value;
        paymentModel.baskets = this.baskets;

        this.spinner.show();
        this.orderService.addPayment(paymentModel).subscribe((res)=>{
          this.spinner.hide();
          this.getListBaskets();
          this.snackbar.openSnackBar("Ödeme işlemi başarılı. Ürünleriniz sevk aşamasına geçmiştir");
        },(err)=>{
          this.errorService.errorHandler(err);
          this.spinner.hide();
        })
      }
    });
  }

  getListProducts(){
    this.spinner.show();
    this.productService.getList().subscribe((res:any)=>{
      this.spinner.hide();
      this.products = res.data;
    },(err)=>{
      this.errorService.errorHandler(err);
      this.spinner.hide();
    });
  }

  getListBaskets(){
    this.spinner.show();
    this.basketService.getList().subscribe((res:any)=>{
      this.spinner.hide();
      this.baskets = res.data;
      this.total = 0;
      res.data.forEach(element => {
        this.total = this.total + (element.product.price * element.quantity);
      });
    },(err)=>{
      this.errorService.errorHandler(err);
      this.spinner.hide();
    });
  }

  addBasket(productModel:ProductModel, inputQuantity:any){

    if (+inputQuantity.value < 0) {
      this.snackbar.openSnackBar("Sepete eklenecek ürün adedi 0'dan düşük olamaz!");
      return;
    }

    if (productModel.inventoryQuantity < +inputQuantity.value) {
      this.snackbar.openSnackBar("Sepete eklenecek ürün adedi, ürünün stok adedinden fazla olamaz!");
      return;
    }

    this.spinner.show();
    let basketModel = new BasketModel();
    basketModel.product = productModel;
    basketModel.productId = productModel.id;
    basketModel.quantity = inputQuantity.value;

    this.basketService.add(basketModel).subscribe((res)=>{
      this.spinner.hide();
      this.snackbar.openSnackBar("Ürün sepete başarıyla eklendi") ;
      this.getListBaskets();
      this.getListProducts();
    },(err)=>{
      this.errorService.errorHandler(err);
      this.spinner.hide();
    })
  }

  updateBaskets(basketModel:BasketModel, quantity:number){
    if (basketModel.quantity + quantity < 1) {
      this.deleteBasket(basketModel);
      return;
    }

    if (basketModel.product.inventoryQuantity - quantity  < 0) {
      this.snackbar.openSnackBar("Sepete eklenecek ürün adedi, ürünün stok adedinden fazla olamaz!");
      return;
    }


    basketModel.quantity = basketModel.quantity + quantity;

    this.spinner.show();
    this.basketService.update(basketModel).subscribe((res)=>{
      this.spinner.hide();
      this.snackbar.openSnackBar("Sepetteki ürün adedi başarıyla güncellendi");
      this.getListBaskets();
      this.getListProducts();
    },(err)=>{
      this.errorService.errorHandler(err);
      this.spinner.hide();
    })
  }

  deleteBasket(basketModel:BasketModel){
    this.spinner.show();
    this.basketService.delete(basketModel).subscribe((res)=>{
      this.spinner.hide();
      this.snackbar.openSnackBar("Sepetteki ürün başarıyla silindi");
      this.getListBaskets();
      this.getListProducts();
    },(err)=>{
      this.errorService.errorHandler(err);
      this.spinner.hide();
    })
  }
}


@Component({
  selector: 'delete-dialog-component',
  templateUrl: 'delete-dialog.html',
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'payment-dialog-component',
  templateUrl: 'payment-dialog.html',
  styleUrls: ['./home.component.scss']
})
export class PaymentDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any[],
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
