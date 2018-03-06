package io.pax.movie.ws;

import io.pax.movie.dao.UserDao;
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

}
