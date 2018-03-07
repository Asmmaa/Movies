package io.pax.movie.dao;

import io.pax.movie.model.FavMovie;
import io.pax.movie.model.Movie;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class MovieDao {

    JdbcConnector connector = new JdbcConnector();

   public int createMovie(String imDbId, String title, int userId) throws SQLException {
       String query = "INSERT INTO movie (imdbid, title, user_id) VALUES (?,?,?)";
       Connection conn = this.connector.getConnection();
       PreparedStatement stmt = conn.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);

       stmt.setString(1,imDbId);
       stmt.setString(2,title);
       stmt.setInt(3, userId);

       stmt.execute();

       ResultSet key = stmt.getGeneratedKeys();
       key.next();

       int id = key.getInt(1);

       stmt.close();
       conn.close();

       return id;
   }

   public List<Movie> findMovies() throws SQLException {
       List<Movie> movies = new ArrayList<>();

       String query = "SELECT * FROM movie";
       Connection conn = this.connector.getConnection();
       PreparedStatement stmt = conn.prepareStatement(query);
       ResultSet rs = stmt.executeQuery();

       while (rs.next()) {
           String title = rs.getString("title");
           String imDbId = rs.getString("imdbId");
           int id = rs.getInt("id");
           //int user_id = rs.getInt("user_id");

           movies.add(new FavMovie(id, title, imDbId));
       }
       rs.close();
       stmt.close();
       conn.close();

       return movies;
   }

    public List<Movie> findMoviesByUserId(int userId) throws SQLException {

        String query = "SELECT * FROM movie WHERE user_id=?";
        List<Movie> moviesId = new ArrayList<>();

        Connection conn = this.connector.getConnection();
        PreparedStatement stmt = conn.prepareStatement(query);
        stmt.setInt(1, userId);
        ResultSet rs = stmt.executeQuery();

        while (rs.next()) {
            String title = rs.getString("title");
            String imDbId = rs.getString("imdbid");
            int id = rs.getInt("id");


            moviesId.add(new FavMovie(id, title, imDbId));
        }
        rs.close();
        stmt.close();
        conn.close();

        return moviesId;
    }

    public static void main(String[] args) throws SQLException {
        MovieDao dao = new MovieDao();
       // System.out.println(dao.createMovie("1J5857", "Star Wars", 5));
       dao.findMovies();
//        dao.findMoviesByUserId(4);
    }
}
