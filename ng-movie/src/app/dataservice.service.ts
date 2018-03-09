import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./model/user";
import {Movie} from "./model/movie";
import {Infos} from "./model/infos";

@Injectable()
export class DataService {

  constructor(public http: HttpClient) {
  }

  fetchDBUsers(): Promise<User[]> {
    let url = ('http://10.31.1.30:8080/movies/api/users/');
    return this.http
      .get(url)
      .toPromise()
      .then(data => {
        return data as User[]
      })
  }

  fetchDBFriends(user: User): Promise<User[]> {
    let url = ('http://10.31.1.30:8080/movies/api/users/' + user.pseudo);
    return this.http
      .get(url)
      .toPromise()
      .then(data => {
        return data as User[]
      })
  }

  fetchDBMovies(user: User): Promise<Movie[]> {
    const url = ('http://10.31.1.30:8080/movies/api/fav_movies/' + user.id);
    return this.http
      .get(url)
      .toPromise()
      .then(data => {
        return data as Movie[];
      });
  }

  fetchOmdbMovies(extract: string): Promise<Movie[]> {
    return this.http
      .get('http://www.omdbapi.com/?apikey=d424c139&s=' + extract)
      .toPromise()
      .then(data => {
        return data as Movie[]
      });
  }

  fetchOmdbInfos(movieId: string): Promise<Infos> {
    console.log(movieId);
    return this.http
      .get('http://www.omdbapi.com/?apikey=d424c139&type=movie&i=' + movieId)
      .toPromise()
      .then(data => {
        return data as Infos;
      });
  }

  createFavMovie(movie: Movie) {
    let url = 'http://10.31.1.30:8080/movies/api/fav_movies';
    let dto = {
      imDbId: movie.imdbID,
      title: movie.Title,
      user: {
        id: movie.user.id,
        name: movie.user.name,
        pseudo: movie.user.pseudo
      }
    }
    return this.http.post(url, dto)
      .toPromise()
      .then(console.log);
  }

  createFriends(user: User, friend: User) {
    console.log("OK");
    let url = 'http://10.31.1.30:8080/movies/api/users';
    let dto = [{
      pseudo: user.pseudo,
    },{
      pseudo : friend.pseudo
    }]
    return this.http.post(url, dto)
      .toPromise()
  }

}
