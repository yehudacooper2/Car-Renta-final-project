
import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { UserStore } from '../shared/models/user-store.model';
import { UserEditService } from '../shared/services/userEdit.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {


  userStore: UserStore;
  actionMsg: string;
  constructor(private myUserService: UserService, private myUserEditService: UserEditService) { }

  ngOnInit() {
    this.userStore = this.myUserService.userInfo;
  }

  showUser(userName: string) {
    this.myUserService.getUser(userName);
  }

  deleteUser(userName: string) {
    this.myUserEditService.deleteUser(userName).subscribe(
      (res) => {
        if (res) {
          this.myUserService.getUsers();
        }
        this.actionMsg = (res) ? 'delete success' : 'delete fail';

      });



  }
}
