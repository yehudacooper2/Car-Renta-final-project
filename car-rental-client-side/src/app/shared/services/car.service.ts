import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../models/car.model';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { CarStore } from '../models/car-store.model';
import { UserService } from './user.service';


@Injectable()
export class CarService {
    private link = 'http://localhost:51349/api/car';
    private userName = this.myUserService.userInfo.singleUser.UserName;
    private userPassword = this.myUserService.userInfo.singleUser.UserPassword;
    carInfo: CarStore = new CarStore();
    constructor(private myHttpClient: HttpClient, private myUserService: UserService) {
        this.getCars();
    }


    // GET : get all cars from server (and save the returned value to a property in this service)
    getCars(): void {
        this.myHttpClient.get(this.link)
            .subscribe((x: Array<Car>) => { this.carInfo.carList = x; });
    }

    // GET : get a specific car (by carNumber) from server (and save the returned value to a property in this service)
    getCar(carNumber: string): void {
        this.myHttpClient.get(`${this.link}?carNumber=${carNumber}`
)
            .subscribe((x: Car) => { this.carInfo.singleCar = x; });
    }


      getCarForEdit(carNumber: string, callback: (car: Car) => void): void {

        this.myHttpClient.get(`${this.link}?carNumber=${carNumber}`)
            .subscribe((x: Car) => { callback(x); });
    }
// sends a request to delete a specific car (by carNumber) from server.

    deleteCar(carNumber: string): Observable<boolean> {
        const apiUrl = `${this.link}?carNumber=${carNumber}`;
        return this.myHttpClient.delete<boolean>(apiUrl,  { headers: {'Authorization': `${this.userName} ${ this.userPassword }` }});
    }

// sends a request to add a new car to the db on the server.

    addCar(car: Car, callback: (bool: boolean) => void): void {
        this.myHttpClient.post<boolean> (this.link , JSON.stringify(car),
        { headers: {'content-type': 'application/json', 'Authorization': `${this.userName} ${ this.userPassword }` }})
        .subscribe(() => {this.getCars(); callback(true); },
        () => {callback(false); });
    }
// sends a request to update s specific car (by carNumber) in the db on the server.

    editCar(car: Car, carNumber: string, callback: (bool: boolean) => void): void {
        this.myHttpClient.put<boolean>(`${this.link}?carNumber=${carNumber}`, JSON.stringify(car),
        { headers: {'content-type': 'application/json', 'Authorization': `${this.userName} ${ this.userPassword }` }})
        .subscribe(() => {this.getCars(); callback(true); },
        () => {callback(false); });
    }


}
