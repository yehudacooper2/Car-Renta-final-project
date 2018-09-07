
import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { UserStore } from '../shared/models/user-store.model';
import { User } from '../shared/models/user.model';
import { OrderService } from '../shared/services/order.service';
import { OrderStore } from '../shared/models/order-store.model';
import { Order } from '../shared/models/order.model';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  userOrderArray: Array<Order> = new Array<Order>();
  orderStore: OrderStore;

  userStore: UserStore;
  localUserName: string;
  localUser: User;
  constructor(private myUserService: UserService, private myOrderService: OrderService) { }

  ngOnInit() {
    this.userStore = this.myUserService.userInfo;
    this.orderStore = this.myOrderService.orderInfo;
//    this.showUserOrders();
  }

  showOrder(carNumber: string) {
    this.myOrderService.getOrder(carNumber);
  }
  chooseUser(userName: string): void {
  //  if (this.userStore.userList.find(x => x.UserName === this.localUserName && x.UserRole === 'manager')) {
     this.myUserService.getUser(userName);

     this.localUser = this.userStore.userList.find(x => x.UserName === this.localUserName);
  //  }
  }

  showUserOrders(): void {
    this.userOrderArray = [];
    for (let i = 0 ; i < this.orderStore.orderList.length; i++) {
      if (this.orderStore.orderList[i].OrderUser.UserName === this.myUserService.userInfo.singleUser.UserName) {
        this.userOrderArray.push(this.orderStore.orderList[i]);
  }
}

  }
}
