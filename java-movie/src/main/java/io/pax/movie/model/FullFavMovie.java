package io.pax.movie.model;

public class FullFavMovie extends FavMovie {

    FilmFan user;


    public FullFavMovie(int id, String title, String imDbId, FilmFan user) {
        super(id, title, imDbId);
        this.user = user;
    }

    public FullFavMovie() {
        super();
    }

    @Override
    public FilmFan getUser() {
        return user;
    }

    @Override
    public void setUser(FilmFan user) {
        this.user = user;
    }
}
