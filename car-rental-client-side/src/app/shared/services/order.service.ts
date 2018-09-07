import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { OrderStore } from '../models/order-store.model';
import { UserService } from './user.service';


@Injectable()
export class OrderService {
    private link = 'http://localhost:51349/api/order';
    private userName = this.myUserService.userInfo.singleUser.UserName;
    private userPassword = this.myUserService.userInfo.singleUser.UserPassword;
    orderInfo: OrderStore = new OrderStore();

    constructor(private myHttpClient: HttpClient, private myUserService: UserService) {
        this.getOrders();
    }


    // GET : get all orders from server (and save the returned value to a property in this service)
    getOrders(): void {
        this.myHttpClient.get(this.link)
            .subscribe((x: Array<Order>) => { this.orderInfo.orderList = x; });
    }

    // GET : get a specific order (by carNumber) from server (and save the returned value to a property in this service)
    getOrder(carNumber: string): void {
        this.myHttpClient.get(`${this.link}?carNumber=${carNumber}`)
            .subscribe((x: Order) => { this.orderInfo.singleOrder = x; });
    }


      getOrderForEdit(carNumber: string, callback: (order: Order) => void): void {

        this.myHttpClient.get(`${this.link}?carNumber=${carNumber}`)
            .subscribe((x: Order) => { callback(x); });
    }

    deleteOrder(carNumber: string): Observable<boolean> {
        const apiUrl = `${this.link}?carNumber=${carNumber}`;
        return this.myHttpClient.delete<boolean>(apiUrl, { headers: {'Authorization': `${this.userName} ${ this.userPassword }` }});
    }


    addOrder(order: Order, callback: (bool: boolean) => void): void {
        this.myHttpClient.post<boolean> (this.link , JSON.stringify(order),
         { headers: {'content-type': 'application/json' }})
         .subscribe(() => {this.getOrders(); callback(true); },
        () => {callback(false); });
    }

    editOrder(order: Order, carNumber: string, callback: (bool: boolean) => void): void {
        this.myHttpClient.put<boolean>(`${this.link}?carNumber=${carNumber}`, JSON.stringify(order),
         { headers: {'content-type': 'application/json', 'Authorization': `${this.userName} ${ this.userPassword }` }})
         .subscribe(() => {this.getOrders(); callback(true); },
        () => {callback(false); });
    }


}
