package io.pax.movie.dao;

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
       Connection conn = this.connector.getConnection();
       Statement stmt = conn.createStatement();
       //ResultSet rs = stmt.executeQuery();
       return null;


   }

    public static void main(String[] args) throws SQLException {
        MovieDao dao = new MovieDao();
        System.out.println(dao.createMovie("1J5857", "Star Wars", 5));
    }
}
