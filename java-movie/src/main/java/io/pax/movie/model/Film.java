package io.pax.movie.model;

import java.util.List;

public class Film implements Movie{
    String imDbId;
    String title;
    int id;
    int year;
    FilmFan user;
    List<FilmFan> users;


    public Film() {
    }

    public Film(int id, String title, String imDbId) {
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

    @Override
    public FilmFan getUser() {
        return null;
    }

    public List<FilmFan> getUsers() {
        return users;
    }

    public void setUsers(List<FilmFan> users) {
        this.users = users;
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
