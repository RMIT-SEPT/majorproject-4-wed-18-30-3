package labwed18303.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Objects;

@Entity

public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String  userName;

    @OneToOne(
            cascade = CascadeType.ALL
            //mappedBy = "admin"
    )
    @JsonIgnoreProperties("admin")
    private User user;


    public Admin() {
    }

    public Admin(String name, String password, String address, int phone) {
        user = new User(name, password, address, phone, UserType.ADMIN);
    }

    public long getId(){
        return id;
    }

    public User getUser(){
        return user;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Admin)) return false;
        Admin admin = (Admin) o;
        return user.equals(admin.getUser());
    }

    @Override
    public int hashCode() {
        return Objects.hash(user);
    }
}

