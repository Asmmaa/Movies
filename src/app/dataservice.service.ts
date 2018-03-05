import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./model/user";

@Injectable()
export class DataService {

  constructor(public http: HttpClient) { }

  fetchUsers(): Promise <User[]>
  {
    let url = ('http://10.31.1.30:8080/movie/api/users/');

    return this.http
      .get(url)
      .toPromise()
      .then(data => {
        return data as User[]
      })

  }

  fetchFriends(user: User): Promise <User[]>
  {
  let url = ('http://10.31.1.30:8080/movie/api/users/'+ user.pseudo);

    return this.http
      .get(url)
      .toPromise()
      .then(data => {
      return data as User[]
  })

  }

}
