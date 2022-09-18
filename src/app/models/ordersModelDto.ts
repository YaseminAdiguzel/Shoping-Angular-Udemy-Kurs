import { OrderModel } from "./orderModel";
import { PaymentModel } from "./paymentModel";

export class OrderModelDto{
  payment:PaymentModel;
  orders:OrderModel[];
  total:number;
}
