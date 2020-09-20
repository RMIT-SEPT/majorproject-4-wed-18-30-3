package labwed18303.demo.model;

import javax.persistence.*;

@Entity

public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne(
            cascade = CascadeType.ALL
    )
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
}

