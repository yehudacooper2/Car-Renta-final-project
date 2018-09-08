
import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../shared/models/user.model';
import { UserEditService } from '../shared/services/userEdit.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  actionMsg: string;
  localParam: string;
  localUser: User =
    {
      'UserFullName': undefined,
      'UserIdentityNumber': undefined,
      'UserName': undefined,
      'UserBirthDay': undefined,
      'UserGender': undefined,
      'UserEmail': undefined,
      'UserPassword': undefined,
      'UserRole': undefined,
      'UserImage': undefined
    };

  constructor(private myUserService: UserService, private myActivatedRoute: ActivatedRoute, private myUserEditService: UserEditService) { }

  ngOnInit() {
  }

  saveChanges() {
    const callback = (bool: boolean) => { this.actionMsg = (bool) ? 'action success' : 'action fail'; };
    this.localUser.UserRole = 'user';
    // tslint:disable-next-line:max-line-length
    if (this.localUser.UserIdentityNumber.length !== 9) {
      this.actionMsg = 'please enter identity number with 9 digits';
    } else
      if (this.localUser.UserPassword.length !== 6) {
        this.actionMsg = 'please enter identity number with 6 digits';
      } else
        if (this.localUser.UserFullName == null || this.localUser.UserPassword == null || this.localUser.UserEmail == null
          || this.localUser.UserGender == null || this.localUser.UserIdentityNumber == null || this.localUser.UserName == null) {
          this.actionMsg = 'please enter all required fields';
        } else {
          (this.myUserEditService.addUser(this.localUser, callback));
        }
  }



}
