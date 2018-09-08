import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarType } from '../models/carType.model';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { CarTypeStore } from '../models/carType-store.model';
import { UserService } from './user.service';

@Injectable()
export class CarTypeService {
    private link = 'http://localhost:51349/api/carType';
    private userName = this.myUserService.userInfo.singleUser.UserName;
    private userPassword = this.myUserService.userInfo.singleUser.UserPassword;
    carTypeInfo: CarTypeStore = new CarTypeStore();

    constructor(private myHttpClient: HttpClient, private myUserService: UserService) {
        this.getCarTypes();

    }


    // GET : get all carTypes from server (and save the returned value to a property in this service)
    getCarTypes(): void {
        this.myHttpClient.get(this.link)
            .subscribe((x: Array<CarType>) => { this.carTypeInfo.carTypeList = x; });
    }

    // GET : get a specific carType (by carModel) from server (and save the returned value to a property in this service)
    getCarType(carModel: string): void {
        this.myHttpClient.get(`${this.link}?carModel=${carModel}`)
            .subscribe((x: CarType) => { this.carTypeInfo.singleCarType = x; });
    }


     getCarTypeForEdit(carModel: string, callback: (carType: CarType) => void): void {

        this.myHttpClient.get(`${this.link}?carModel=${carModel}`)
            .subscribe((x: CarType) => { callback(x); });
    }
// sends a request to delete a specific carType (by carModel) from server.

    deleteCarType(carModel: string): Observable<boolean> {
        const apiUrl = `${this.link}?carModel=${carModel}`;
        return this.myHttpClient.delete<boolean>(apiUrl, { headers: {'Authorization': `${this.userName} ${ this.userPassword }` }});
    }

// sends a request to add a new carType to the db on the server.

    addCarType(carType: CarType, callback: (bool: boolean) => void): void {
        this.myHttpClient.post<boolean> (this.link , JSON.stringify(carType),
         { headers: {'content-type': 'application/json', 'Authorization':  `${this.userName} ${ this.userPassword }` }})
         .subscribe(() => {this.getCarTypes(); callback(true); },
        () => {callback(false); });
    }
// sends a request to update s specific carType (by carModel) in the db on the server.

    editCarType(carType: CarType, carModel: string, callback: (bool: boolean) => void): void {
        // tslint:disable-next-line:max-line-length
        this.myHttpClient.put<boolean>(`${this.link}?carModel=${carModel}`, JSON.stringify(carType), { headers: {'content-type': 'application/json', 'Authorization':  `${this.userName} ${ this.userPassword }`}}).subscribe(() => {this.getCarTypes(); callback(true); },
        () => {callback(false); });
    }


}
