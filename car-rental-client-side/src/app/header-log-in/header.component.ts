
import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { UserStore } from '../shared/models/user-store.model';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  localAnonimus: string;
  userStore: UserStore;
  localUserName: string;
  localUserPassword: string;
  localUser: User =
   { 'UserFullName': undefined,
   'UserIdentityNumber': undefined,
   'UserName':  undefined,
   'UserBirthDay': undefined,
   'UserGender':  undefined,
   'UserEmail':  undefined,
   'UserPassword':  undefined,
   'UserRole':  undefined,
   'UserImage':  undefined };
  constructor(private myUserService: UserService) {

   }

  ngOnInit() {
    this.userStore = this.myUserService.userInfo;


     this.localUser = this.myUserService.userInfo.singleUser ||
       { 'UserFullName': undefined,
    'UserIdentityNumber': undefined,
    'UserName':  undefined,
    'UserBirthDay': undefined,
    'UserGender':  undefined,
    'UserEmail':  undefined,
    'UserPassword':  undefined,
    'UserRole':  undefined,
    'UserImage':  undefined };

    this.userStore.singleUser =  this.userStore.singleUser || { 'UserFullName': undefined,
    'UserIdentityNumber': undefined,
    'UserName':  undefined,
    'UserBirthDay': undefined,
    'UserGender':  undefined,
    'UserEmail':  undefined,
    'UserPassword':  undefined,
    'UserRole':  undefined,
    'UserImage':  undefined };

  }
  chooseUser(): void {
   if (this.userStore.userList.find(x => x.UserName === this.localUserName && x.UserPassword === this.localUserPassword )) {
     this.userStore.singleUser = this.userStore.userList.find(x => x.UserName === this.localUserName);
  } else {
    this.userStore.singleUser = { 'UserFullName': undefined,
     'UserIdentityNumber': undefined,
     'UserName':  undefined,
     'UserBirthDay': undefined,
     'UserGender':  undefined,
     'UserEmail':  undefined,
     'UserPassword':  undefined,
     'UserRole':  undefined,
     'UserImage':  undefined };
  }
}
logOut(): void {
  this.userStore.singleUser = { 'UserFullName': undefined,
  'UserIdentityNumber': undefined,
  'UserName':  undefined,
  'UserBirthDay': undefined,
  'UserGender':  undefined,
  'UserEmail':  undefined,
  'UserPassword':  undefined,
  'UserRole':  'a',
  'UserImage':  undefined };
}

}
