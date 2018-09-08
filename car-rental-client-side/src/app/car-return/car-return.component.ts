
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/services/order.service';
import { OrderStore } from '../shared/models/order-store.model';
import { getLocaleDateTimeFormat } from '@angular/common';
import { Order } from '../shared/models/order.model';
import { CarService } from '../shared/services/car.service';
import { CarStore } from '../shared/models/car-store.model';
import { Car } from '../shared/models/car.model';
@Component({
  selector: 'app-car-return',
  templateUrl: './car-return.component.html',
  styleUrls: ['./car-return.component.css']
})
export class CarReturnComponent implements OnInit {
  numberOfDates: number;
  numberOfDelayDates: number;
  numberOfNoDelayDates: number;
  orderCosts: number;
  localCarNumber: string;
  orderStore: OrderStore;
  actionMsg: string;
  localOrder: Order;
  carStore: CarStore;
  constructor(private myOrderService: OrderService, private myCarService: CarService) { }

  ngOnInit() {
    this.orderStore = this.myOrderService.orderInfo;
    this.carStore = this.myCarService.carInfo;
  }

  showOrder(carNumber: string) {
    this.myOrderService.getOrder(carNumber);
    this.myCarService.getCar(carNumber);

  }
  returnCar() {
    this.localOrder = this.orderStore.singleOrder;

    this.orderStore.singleOrder.OrderActualReturnDate = new Date(new Date().toString());
    // tslint:disable-next-line:max-line-length
    this.numberOfDates = (new Date(this.localOrder.OrderActualReturnDate).getTime() - new Date(this.localOrder.OrderStartDate).getTime()) / 86400000;
    // tslint:disable-next-line:max-line-length
    this.numberOfDelayDates = (new Date(this.localOrder.OrderActualReturnDate).getTime() - new Date(this.localOrder.OrderReturnDate).getTime()) / 86400000;
    // tslint:disable-next-line:max-line-length
    this.numberOfNoDelayDates = (new Date(this.localOrder.OrderReturnDate).getTime() - new Date(this.localOrder.OrderStartDate).getTime()) / 86400000;

    // tslint:disable-next-line:max-line-length
    this.orderCosts = this.numberOfDelayDates * this.carStore.singleCar.CarType.DayDelayCost + this.numberOfNoDelayDates * this.carStore.singleCar.CarType.DailyCost;

    const callback = (bool: boolean) => { this.actionMsg = (bool) ? 'action success' : 'action fail'; };
    this.myOrderService.editOrder(this.localOrder, this.localCarNumber, callback);

  }
}
