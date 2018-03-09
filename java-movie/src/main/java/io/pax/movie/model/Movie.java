package io.pax.movie.model;

public interface Movie {
    String getImDbId();
    int getId();
    String getTitle();
    FilmFan getUser();
}
