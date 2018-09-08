
import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../shared/models/user.model';
import { UserEditService } from '../shared/services/userEdit.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {


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
    this.myActivatedRoute.params.subscribe(params => {
      this.localParam = params.userName;

      if (params.userName) {
        this.myUserService.getUserForEdit(params.userName, (user: User) => { this.localUser = user; });
      }
    });
  }

  saveChanges() {
    const callback = (bool: boolean) => { this.actionMsg = (bool) ? 'action success' : 'action fail'; };
    // tslint:disable-next-line:max-line-length
    (this.localParam) ? this.myUserEditService.editUser(this.localUser, this.localParam, callback) : this.myUserEditService.addUser(this.localUser, callback);
  }



}
