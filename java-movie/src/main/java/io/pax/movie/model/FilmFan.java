package io.pax.movie.model;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class FilmFan implements User{

    int id;
    String name;
    String pseudo;

    public FilmFan(){

    }

    public FilmFan(int id, String name, String pseudo){
        this.id = id;
        this.name = name;
        this.pseudo= pseudo;
    }

    @Override
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String getPseudo() {
        return pseudo;
    }

    public void setPseudo(String pseudo) {
        this.pseudo = pseudo;
    }

/*    @Override
    public String toString() {
        return "FilmFan{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", pseudo='" + pseudo + '\'' +
                '}';
    }*/
}
