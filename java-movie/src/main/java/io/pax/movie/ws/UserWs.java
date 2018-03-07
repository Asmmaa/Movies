package io.pax.movie.ws;

import io.pax.movie.dao.UserDao;
import io.pax.movie.model.FilmFan;
import io.pax.movie.model.User;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.SQLException;
import java.util.List;

@Path("users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserWs {

    @GET
    public List<User> getUsers() throws SQLException {
        UserDao dao = new UserDao();
        return dao.listUsers();
    }

    @GET
    @Path("{pseudo}")
    public List<User> getFans(@PathParam("pseudo") String pseudo) throws SQLException {
        UserDao dao = new UserDao();
        return dao.listFriendsByPseudo(pseudo);
    }

    @POST
    public void addAFriend(List<FilmFan> currents){
        if (currents.size()==2) {
            System.out.println("OK");
        }
        String pseudoCurrent = currents.get(0).getPseudo();
        String pseudoFriend = currents.get(1).getPseudo();

        try {
            int id = new UserDao().insertFriend(pseudoCurrent, pseudoFriend);
        } catch (SQLException e) {
            throw new ServerErrorException("Database error", 500);
        }
    }
}
