package io.pax.movie.model;

public class FavMovie implements Movie {

    String imDbId;
    String title;
    int id;
    int year;
    FilmFan user;


    public FavMovie() {
    }

    public FavMovie(int id, String title, String imDbId) {
        this.imDbId = imDbId;
        this.title = title;
        this.id = id;
    }

    @Override
    public String getImDbId() {
        return imDbId;
    }

    public void setImDbId(String imDbId) {
        this.imDbId = imDbId;
    }

    @Override
    public String getTitle() {
        return title;
    }

    public void setUser(FilmFan user) {
        this.user = user;
    }

    @Override
    public FilmFan getUser() {
        return this.user;
    }

    public int getYear() {
        return this.year;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setYear(int year) {
        this.year = year;
    }
}
