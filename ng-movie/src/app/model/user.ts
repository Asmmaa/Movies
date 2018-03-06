import {Movie} from "./movie";

export class User {
  name: string;
  id: number;
  pseudo: string;
  friends: User[];
  movies: Movie[];
}
