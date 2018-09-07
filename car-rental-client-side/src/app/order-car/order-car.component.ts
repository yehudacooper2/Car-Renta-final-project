
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../shared/services/car.service';
import { Order } from '../shared/models/order.model';
import { CarStore } from '../shared/models/car-store.model';
import { Car } from '../shared/models/car.model';
import { User } from '../shared/models/user.model';
import { UserStore } from '../shared/models/user-store.model';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-order-car',
  templateUrl: './order-car.component.html',
  styleUrls: ['./order-car.component.css']
})
export class OrderCarComponent implements OnInit {
eachDayCosts: number;
eachDayDelayCosts: number;
orderCosts: number;
numberOfDates: number;
carStore: CarStore;
userStore: UserStore;
actionMsg: string;
  localParam: string;
  localOrder: Order = {'OrderStartDate': undefined, 'OrderReturnDate': undefined, 'OrderActualReturnDate': undefined,
   'OrderCar': undefined, 'OrderUser': undefined};

  constructor(private myOrderService: OrderService, private  myCarService: CarService,
     private myUserService: UserService, private myActivatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.userStore = this.myUserService.userInfo;

    this.carStore = this.myCarService.carInfo;
    this.myActivatedRoute.params.subscribe(params => {
      this.localParam = params.carNumber;

      if (params.carNumber) {
        this.myOrderService.getOrderForEdit(params.carNumber, (order: Order) => {this.localOrder = order; } );
      }
    });
  }
  // tslint:disable-next-line:max-line-length
  saveOrderCosts() {
    // tslint:disable-next-line:max-line-length
    this.localOrder.OrderCar = this.carStore.singleCar;
    this.localOrder.OrderUser = this.userStore.singleUser;

    // tslint:disable-next-line:max-line-length
    this.numberOfDates = (new Date(this.localOrder.OrderReturnDate).getTime() - new Date(this.localOrder.OrderStartDate).getTime()) / 86400000;
    this.orderCosts = this.numberOfDates * this.carStore.singleCar.CarType.DailyCost;
    this.eachDayCosts = this.carStore.singleCar.CarType.DailyCost;
    this.eachDayDelayCosts = this.carStore.singleCar.CarType.DayDelayCost;
  }
  saveChanges() {
    if (this.myUserService.userInfo.singleUser.UserRole = undefined) {
      this.actionMsg = 'you must register and log-in before ordering a car';
    } else {
    const callback = (bool: boolean) => {this.actionMsg = (bool) ? 'action success' : 'action fail'; } ;

    this.localOrder.OrderCar = this.carStore.singleCar;
    this.localOrder.OrderUser = this.userStore.singleUser;
    (this.localParam) ? this.myOrderService.editOrder(this.localOrder, this.localParam, callback)
     : this.myOrderService.addOrder(this.localOrder, callback) ;
  }

}
}
