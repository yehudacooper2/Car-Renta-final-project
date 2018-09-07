import { Component, OnInit } from '@angular/core';
import { OrderStore } from '../shared/models/order-store.model';
import { OrderService } from '../shared/services/order.service';

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.css']
})
export class SingleOrderComponent implements OnInit {

  orderStore: OrderStore;
  constructor(private myOrderService: OrderService) { }

  ngOnInit() {
    this.orderStore = this.myOrderService.orderInfo;
  }

}
