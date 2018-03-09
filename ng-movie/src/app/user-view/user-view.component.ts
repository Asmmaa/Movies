import {Component, OnInit} from '@angular/core';
import {User} from "../model/user";
import {DataService} from "../dataservice.service";
import {Movie} from "../model/movie";
import {Infos} from "../model/infos";
import {AppComponent} from "../app.component";


@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  users: User[];
  loggedUserPseudo = this.appComponent.loggedUser;
  currentUser: User = new User();
  foundMovies: Movie[] = [];
  foundMovie = new Movie();
  hoverEdit: boolean = false;
  popupMovie: boolean;
  popupFriend: boolean;
  proposeFriends: boolean;
  selectedMovie: Movie = new Movie();
  selectedFriend: User;
  movieTitleInput: string;
  foundFriends: User[] = [];
  searchFriend: User;

  constructor(public dataservice: DataService, public appComponent: AppComponent) {

    dataservice.fetchDBUsers()
      .then(users => {
        this.users = users
        this.currentUser = users.find(user => user.pseudo === this.loggedUserPseudo)
        console.log(this.currentUser)
      })
      .then(() => this.getDBUserFriends(this.currentUser))
      .then(() => {
          this.getDBUserMovies(this.currentUser)
            .then(movies => {
                movies.forEach(movie => {
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
    this.dataservice.fetchDBUsers()
      .then(users => {
        this.users = users
        this.currentUser = users.find(user => user.pseudo === this.loggedUserPseudo)
        console.log(this.currentUser)
      })
      .then(() => this.getDBUserFriends(this.currentUser))
      .then(() => {
          this.getDBUserMovies(this.currentUser)
            .then(movies => {
                movies.forEach(movie => {
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

  /* ******************  Dynamic Displays ************************ */

  rollUnroll() {
    (this.hoverEdit === false) ? this.hoverEdit = true : this.hoverEdit = false;
  }

  hoverOut() {
    this.proposeFriends = false;
  }

  moviePopupIn(movie: Movie) {
    this.selectedMovie = movie;
    this.popupMovie = true
  }

  moviePopupOut() {
    this.popupMovie = false
  }

  friendPopupIn(friend: User){
    this.searchFriend = friend;
    this.popupFriend = true;
  }

  friendPopupOut(){
    this.popupFriend = false;
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
    this.proposeFriends = true;
    return this.dataservice.fetchDBUsers()
      .then(users => this.foundFriends = users
        .filter(filtered => filtered.pseudo !== this.currentUser.pseudo)
        .filter(user => !this.currentUser.friends.map(f => f.pseudo).includes(user.pseudo))
      )
      .then(console.log)
  }

  /* ******************  DB gets ************************ */

  /* ******************  OMDB gets ************************ */
  findOMDBMovies() {
    return this.dataservice.fetchOmdbMovies(this.movieTitleInput)
      .then(movs => this.foundMovies = (movs as any).Search)
      .catch(e => alert(e.message));
  }

  getMovieInfos(movie: Movie): Promise<Infos> {
    return this.dataservice.fetchOmdbInfos(movie.imDbId)
  }

  /* ******************  OMDB gets ************************ */

  /* ******************  ADD methods ************************ */
  createMovie(){

    this.selectedMovie.user = this.currentUser;
    return this.dataservice
      .createFavMovie(this.selectedMovie)
      .then(() => this.moviePopupOut())
      .then(() => {
        this.currentUser.movies.push(this.selectedMovie);
        this.dataservice.fetchOmdbInfos(this.selectedMovie.imdbID).then( infos => {
          let foundMovie = this.currentUser.movies.find(film => film.imdbID === this.selectedMovie.imdbID)
          foundMovie.infos = infos;
        });
      })
  }

  addFriend(friend: User) {
    console.log(friend)
    this.dataservice
      .createFriends(this.currentUser, friend)
      .then (()=> this.currentUser.friends.push(Object.assign({},this.searchFriend)))
      .catch(e => alert(e.message));
  }

  /* ******************  ADD methods ************************ */

}



