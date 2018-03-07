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
  createdMovie = new Movie();
  foundMovie = new Movie();
  hoverEdit: boolean;
  popupEdit: boolean;
  movies: Movie[] = [];
  selectedMovie: Movie = new Movie();
  selectedFriend: User;
  movieTitleInput: string;

  constructor(public dataservice: DataService) {

    dataservice.fetchUsers()
      .then(users => {
        this.users = users
        this.currentUser = users.find(user => user.pseudo === this.fakeLogin)
      })
    .then(() => this.details(this.currentUser))
      .then(() => this.displayMovie(this.currentUser))
  }

  ngOnInit() {
  }

/* ******************  Dynamic Displays ************************ */

  hoverIn(){
    this.hoverEdit = true;
  }
  hoverOut(){
    this.hoverEdit = false;
  }
  moviePopupIn(movie: Movie) {
    this.selectedMovie = movie;
    this.popupEdit = true
  }

  moviePopupOut() {
    this.popupEdit = false
  }

  /* ******************  Dynamic Displays ************************ */

  details(user: User){
    this.dataservice
      .fetchFriends(user)
      .then(friends => {

         this.friends = friends
      })
  }

  details2(user: User){
    this.selectedFriend = user;
    this.currentUser = user;
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

  findOMDBMovies() {
    return this.dataservice.fetchMoviesOMDB(this.movieTitleInput)
      .then(movs => this.foundMovies = (movs as any).Search)
      .then(movs => console.log('Found : ', movs))
      .catch(e => alert(e.message));
  }

  createMovie(){
    this.selectedMovie.user = this.currentUser;
    this.dataservice
      .createFavMovie(this.selectedMovie)
     // .then(() => this.currentUser.movies.push(Object.assign({},this.selectedMovie)))
      .then(() => this.moviePopupOut())
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



