
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/services/order.service';
import { OrderStore } from '../shared/models/order-store.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {


  orderStore: OrderStore;
  actionMsg: string;
  constructor(private myOrderService: OrderService) { }

  ngOnInit() {
    this.orderStore = this.myOrderService.orderInfo;
  }

  showOrder(carNumber: string) {
    this.myOrderService.getOrder(carNumber);
  }

  deleteOrder(carNumber: string) {
    this.myOrderService.deleteOrder(carNumber).subscribe(
      (res) => {
        if (res) {
          this.myOrderService.getOrders();
        }
        this.actionMsg = (res) ? 'delete success' : 'delete fail';

      });



  }
}
