
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
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

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
        this.myOrderService.getOrderForEdit(params.carNumber, (order: Order) => {this.localOrder = order;
           this.localOrder.OrderCar = this.carStore.carList[0];
           this.localOrder.OrderUser = this.userStore.userList[0]; } );
      }
    });
  }

  saveChanges() {
    const callback = (bool: boolean) => {this.actionMsg = (bool) ? 'action success' : 'action fail'; } ;
    this.localOrder.OrderCar = this.localOrder.OrderCar || this.carStore.carList[0];

    this.localOrder.OrderUser = this.localOrder.OrderUser || this.userStore.userList[0];

    (this.localParam) ? this.myOrderService.editOrder(this.localOrder, this.localParam, callback)
    : this.myOrderService.addOrder(this.localOrder, callback) ;
  }


  saveCar(carNumber: string) {
    this.localOrder.OrderCar = this.carStore.carList.find(x => x.CarNumber === carNumber);
    console.log(this.localOrder);
  }
  saveUser(userName: string) {
    this.localOrder.OrderUser = this.userStore.userList.find(x => x.UserName === userName);
    console.log(this.localOrder);
  }

}
