import {Component, OnInit} from '@angular/core';
import {User} from "../model/user";
import {DataService} from "../dataservice.service";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  friends: User[];
  users: User[];
  userChoosed: User;
  fakeLogin: string = 'Sakura';
  currentUser:User=undefined;
  selectedFriend: User;

  constructor(public dataservice: DataService) {


    dataservice.fetchUsers()
      .then(users => {
        this.users = users;
        this.currentUser = users.find(user => user.pseudo === this.fakeLogin)
      })
      .then( ()=> this.details(this.currentUser))


  }

  ngOnInit() {

    this.details(this.currentUser);
  }

  details(user: User) {
    this.userChoosed = user;


    this.dataservice
      .fetchFriends(user)
      .then(friends => this.friends = friends)

  }
}
