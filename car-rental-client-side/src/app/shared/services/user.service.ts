import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { UserStore } from '../models/user-store.model';


@Injectable()
export class UserService {
    private link = 'http://localhost:51349/api/user';
    public userInfo: UserStore = new UserStore();
    constructor(private myHttpClient: HttpClient) {
        this.getUsers();
    }
    // GET : get all users from server (and save the returned value to a property in this service)
    getUsers(): void {
        this.myHttpClient.get(this.link , { headers: {'Authorization': 'yael 234567' }})
            .subscribe((x: Array<User>) => { this.userInfo.userList = x; });
    }

    // GET : get a specific user (by userName) from server (and save the returned value to a property in this service)
    getUser(userName: string): void {
        this.myHttpClient.get(`${this.link}?userName=${userName}`)
            .subscribe((x: User) => { this.userInfo.singleUser = x; });
    }


     getUserForEdit(userName: string, callback: (user: User) => void): void {

        this.myHttpClient.get(`${this.link}?userName=${userName}`)
            .subscribe((x: User) => { callback(x); });
    }

}
