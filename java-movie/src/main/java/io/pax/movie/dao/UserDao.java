package io.pax.movie.dao;


import io.pax.movie.model.FilmFan;
import io.pax.movie.model.User;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class UserDao {
    JdbcConnector connector = new JdbcConnector();

    public List<User> listUsers() throws SQLException {

        List<User> users = new ArrayList<>();
        Connection conn = this.connector.getConnection();
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery("SELECT * FROM user");

        while (rs.next()) {
            String pseudo = rs.getString("pseudo");
            String name = rs.getString("name");
            int id = rs.getInt("id");
            users.add(new FilmFan(id, name, pseudo));
        }

        rs.close();
        stmt.close();
        conn.close();

        return users;
    }


    public List<User> listFriendsByPseudo(String pseudo) throws SQLException {

        List<User> friends = new ArrayList<>();
        Connection conn = this.connector.getConnection();
        String query = "SELECT * FROM user u WHERE u.id IN (SELECT user_id FROM user u INNER JOIN friend f ON f.friend_id = u.id WHERE u.pseudo = ?)";
        PreparedStatement stmt = conn.prepareStatement(query);

        stmt.setString(1,pseudo);
        ResultSet rs = stmt.executeQuery();

        while (rs.next()) {
            String friendPseudo = rs.getString("pseudo");
            String name = rs.getString("name");
            int id = rs.getInt("id");
            friends.add(new FilmFan(id, name, friendPseudo));
        }
        rs.close();
        stmt.close();
        conn.close();

        return friends;
    }

    public int insertFriend(String current, String friend) throws SQLException {
        String query = "INSERT INTO friend (friend_id, user_id)\n" +
                "SELECT (SELECT id FROM user WHERE pseudo=?) as friend_id, (SELECT id FROM user WHERE pseudo=?) as user_id";
        Connection conn = this.connector.getConnection();
        PreparedStatement stmt = conn.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);

        stmt.setString(1,friend);
        stmt.setString(2,current);
        stmt.execute();

        ResultSet key = stmt.getGeneratedKeys();
        key.next();

        int id = key.getInt(1);

        stmt.close();
        conn.close();

        return id;
    }

    public static void main(String[] args) throws SQLException {
        UserDao dao = new UserDao();
        System.out.println(dao.listFriendsByPseudo("Litchix"));
        System.out.println(dao.listUsers());

        System.out.println(dao.insertFriend("Sephiroth","Slidie"));
    }
}
