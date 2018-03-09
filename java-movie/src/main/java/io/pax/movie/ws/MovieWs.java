package io.pax.movie.ws;

import io.pax.movie.dao.MovieDao;
import io.pax.movie.model.FavMovie;
import io.pax.movie.model.Movie;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.SQLException;
import java.util.List;

@Path("fav_movies")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MovieWs {

    @GET
    public List<Movie> getMovies() throws SQLException {
        MovieDao dao = new MovieDao();
        return dao.findMovies();
    }

    @GET
    @Path("{id}")
public List<Movie> getMovies(@PathParam("id") int userId) throws SQLException {
        return new MovieDao().findMoviesByUserId(userId);
    }

    @POST
    public Movie createFavMovie(FavMovie movie){
        if(movie==null){
            throw new NotAcceptableException("No no no !");
        }
        String inDbId = movie.getImDbId();
        String title = movie.getTitle();

        int userId = movie.getUser().getId();
        try {
            int id = new MovieDao().createMovie(inDbId,title,userId);
            return new FavMovie(id, title, inDbId);
        } catch (SQLException e) {
            throw new ServerErrorException("Database error", 500);
        }
    }



}
