import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { UserStore } from '../models/user-store.model';
import { UserService } from './user.service';


@Injectable()
export class UserEditService {
    private link = 'http://localhost:51349/api/user';
    private userInfo: UserStore = new UserStore();
    private userName = this.myUserService.userInfo.singleUser.UserName;
    private userPassword = this.myUserService.userInfo.singleUser.UserPassword;
    constructor(private myHttpClient: HttpClient, private myUserService: UserService) {
    }

    deleteUser(userName: string): Observable<boolean> {
        const apiUrl = `${this.link}?userName=${userName}`;
        return this.myHttpClient.delete<boolean>(apiUrl, { headers: {'Authorization': `${this.userName} ${ this.userPassword }` }});
    }


    addUser(user: User, callback: (bool: boolean) => void): void {
        this.myHttpClient.post<boolean> (this.link , JSON.stringify(user),
         { headers: {'content-type': 'application/json'  }})
         .subscribe(() => {this.myUserService.getUsers(); callback(true); },
        () => {callback(false); });
    }

    editUser(user: User, userName: string, callback: (bool: boolean) => void): void {
        this.myHttpClient.put<boolean>(`${this.link}?userName=${userName}`, JSON.stringify(user),
         { headers: {'content-type': 'application/json' , 'Authorization': `${this.userName} ${ this.userPassword }` }})
         .subscribe(() => {this.myUserService.getUsers(); callback(true); },
        () => {callback(false); });
    }


}
