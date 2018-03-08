import {Component, OnInit} from '@angular/core';
import {User} from "../model/user";
import {DataService} from "../dataservice.service";
import {Movie} from "../model/movie";
import {Infos} from "../model/infos";


@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  users: User[];
  fakeLogin: string = 'Sakura';
  currentUser: User = new User();
  foundMovies: Movie[] = [];
  foundMovie = new Movie();
  hoverEdit: boolean;
  popupEdit: boolean;
  selectedMovie: Movie = new Movie();
  selectedFriend: User;
  movieTitleInput: string;
  foundFriends: User[] = [];

  constructor(public dataservice: DataService) {

    dataservice.fetchDBUsers()
      .then(users => {
        this.users = users
        this.currentUser = users.find(user => user.pseudo === this.fakeLogin)
        console.log(this.currentUser)
      })
      .then(() => this.getDBUserFriends(this.currentUser))
      .then(() => {
          this.getDBUserMovies(this.currentUser)
            .then(movies => {
                movies.forEach(movie => {
                    console.log('fetching infos for ', movie.title)
                    this.getMovieInfos(movie)
                      .then(infos => {
                        movie.infos = infos
                        this.currentUser.movies = movies;
                      })
                  }
                )
              }
            )
        }
      )
  }

  ngOnInit() {
  }

  /* ******************  Dynamic Displays ************************ */

  hoverIn() {
    this.hoverEdit = true;
  }

  hoverOut() {
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

  /* ******************  User methods ************************ */

  userDetail(user: User) {
    this.selectedFriend = user;
    this.currentUser = user;
    this.dataservice.fetchDBFriends(user)
      .then(friends =>
        this.currentUser.friends = friends)
      .then(() => {
          this.getDBUserMovies(user)
            .then(movies => {
                movies.forEach(movie => {
                  console.log('fetching infos for ', movie.title)
                  this.getMovieInfos(movie)
                    .then(infos => {
                      movie.infos = infos
                      this.currentUser.movies = movies;
                    })
                })
              }
            )
        }
      )
  }

  /* ******************  User methods ************************ */

  /* ******************  DB gets ************************ */

  getDBUserFriends(user: User) {
    this.dataservice
      .fetchDBFriends(user)
      .then(friends => {
        this.currentUser.friends = friends
      })
  }

  getDBUserMovies(user: User): Promise<Movie[]> {
    return this.dataservice
      .fetchDBMovies(user)
  }

  findFriends() {
    return this.dataservice.fetchDBUsers()
      .then(users => this.foundFriends = users
        .filter(filtered => filtered.pseudo !== this.currentUser.pseudo)
        .filter(user => !this.currentUser.friends.map(f=>f.pseudo).includes(user.pseudo)  )
      )
      .then(console.log)
  }

  /* ******************  DB gets ************************ */

  /* ******************  OMDB gets ************************ */
  findOMDBMovies() {
    return this.dataservice.fetchOmdbMovies(this.movieTitleInput)
      .then(movs => this.foundMovies = (movs as any).Search)
      .then(movs => console.log('Found : ', movs))
      .catch(e => alert(e.message));
  }

  getMovieInfos(movie: Movie): Promise<Infos> {
    return this.dataservice.fetchOmdbInfos(movie.imDbId)
  }

  /* ******************  OMDB gets ************************ */

  /* ******************  ADD methods ************************ */
  createMovie() {
    this.selectedMovie.user = this.currentUser;
    this.dataservice
      .createFavMovie(this.selectedMovie)
      .then(() => this.moviePopupOut())
      .catch(e => alert(e.message));
  }

  addFriend(friend: User) {
    console.log(friend)
    this.dataservice
      .createFriends(this.currentUser, friend)
      .then(console.log)
      .catch(e => alert(e.message));
  }

  /* ******************  ADD methods ************************ */

}



