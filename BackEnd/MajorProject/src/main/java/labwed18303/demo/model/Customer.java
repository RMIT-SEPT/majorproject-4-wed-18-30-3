package labwed18303.demo.model;

import javax.persistence.*;

@Entity

public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long id;
    private String userName;
    private String password;
    private String address;
    private int phone;

    public Customer() {

    }

    public long getId() {
        return id;
    }

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }

    public String getAddress() {
        return address;
    }

    public int getPhone() {
        return phone;
    }
}
