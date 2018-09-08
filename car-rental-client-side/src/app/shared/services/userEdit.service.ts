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
// sends a request to delete a specific user (by user name) from server.
    deleteUser(userName: string): Observable<boolean> {
        const apiUrl = `${this.link}?userName=${userName}`;
        return this.myHttpClient.delete<boolean>(apiUrl, { headers: {'Authorization': `${this.userName} ${ this.userPassword }` }});
    }

// sends a request to add a new user to the db on the server.
    addUser(user: User, callback: (bool: boolean) => void): void {
        this.myHttpClient.post<boolean> (this.link , JSON.stringify(user),
         { headers: {'content-type': 'application/json'  }})
         .subscribe(() => {this.myUserService.getUsers(); callback(true); },
        () => {callback(false); });
    }
// sends a request to update s specific user (by user name) in the db on the server.
    editUser(user: User, userName: string, callback: (bool: boolean) => void): void {
        this.myHttpClient.put<boolean>(`${this.link}?userName=${userName}`, JSON.stringify(user),
         { headers: {'content-type': 'application/json' , 'Authorization': `${this.userName} ${ this.userPassword }` }})
         .subscribe(() => {this.myUserService.getUsers(); callback(true); },
        () => {callback(false); });
    }


}
