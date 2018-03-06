import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./model/user";
import {Movie} from "./model/movie";

@Injectable()
export class DataService {

  constructor(public http: HttpClient) {
  }

  fetchUsers(): Promise<User[]> {
    let url = ('http://10.31.1.30:8080/movie/api/users/');

    return this.http
      .get(url)
      .toPromise()
      .then(data => {
        return data as User[]
      })

  }

  fetchFriends(user: User): Promise<User[]> {
    console.log(user.pseudo);
    let url = ('http://10.31.1.30:8080/movie/api/users/' + user.pseudo);

    return this.http
      .get(url)
      .toPromise()
      .then(data => {
        return data as User[]
      })
  }

  fetchTypedMovie(extract: string): Promise<Movie> {
    return this.http
      .get('http://www.omdbapi.com/?apikey=d424c139&t=' + extract)
      .toPromise()
      .then(data => {
        return data as Movie
      });
  }

  fetchdMoviesList(extract: string): Promise<Movie[]> {
    return this.http
      .get('http://www.omdbapi.com/?apikey=d424c139&s=' + extract)
      .toPromise()
      .then(data => {
        return data as Movie[]
      });
  }

  createFavMovie(movie: Movie) {
    console.log(movie.user.pseudo)
    let url = 'http://10.31.1.30:8080/movie/api/fav_movies';
    let dto = {
      imDbId: movie.imdbId,
      title: movie.Title,
      user: movie.user
    }
    return this.http.post(url, dto)
      .toPromise()
      .then(console.log);
  }


}
