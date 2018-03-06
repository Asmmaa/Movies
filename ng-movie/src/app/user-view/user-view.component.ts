import {Component, OnInit} from '@angular/core';
import {User} from "../model/user";
import {DataService} from "../dataservice.service";
import {Movie} from "../model/movie";
import {objectify} from "tslint/lib/utils";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  friends: User[] = [];
  users: User[];
  fakeLogin: string = 'Sakura';
  currentUser: User = new User();
  foundMovies: Movie[] = [];
  foundMovie = new Movie();
  movieTitleInput: string = "star";
  movies: Movie[] = [];

  constructor(public dataservice: DataService) {

    dataservice.fetchUsers()
      .then(users => {
        this.users = users
        this.currentUser = users.find(user => user.pseudo === this.fakeLogin)
        console.log(this.currentUser)
      })
      .then(() => this.details(this.currentUser))
      .then(() => this.displayMovie(this.currentUser))
  }

  ngOnInit() {
  }

  details(user: User) {
    this.dataservice
      .fetchFriends(user)
      .then(friends => {
        this.friends = friends
      })
  }

  findMovieFromInput() {
    return this.dataservice.fetchOMDBTypedMovie(this.movieTitleInput)
      .then(mov => this.foundMovie = mov)
      .then(mov => console.log('Found : ', mov))
  }

  findMovies() {
    return this.dataservice.fetchMoviesOMDB(this.movieTitleInput)
      .then(movs => this.foundMovies = (movs as any).Search)
      .then(movs => console.log('Found : ', movs))
      .catch(e => alert(e.message));
  }

  createMovie() {
    this.foundMovie.user = this.currentUser;
    this.dataservice
      .createFavMovie(this.foundMovie)
      .then(() => this.currentUser.movies.push(Object.assign({}, this.foundMovie)))
      .catch(e => alert(e.message));
  }

  displayMovie(user: User) {
    this.dataservice
      .fetchFavoriteMovies(user)
      .then(movies =>{
      this.movies = movies
        console.log(movies)

    })

  }


}



