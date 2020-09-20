package labwed18303.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity

public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne(
            cascade = CascadeType.ALL
    )
    private User user;

    @OneToMany(
            mappedBy = "customer",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )

    @JsonIgnoreProperties("customer")
    private List<Booking> bookings = new ArrayList<>();

    public Customer() {
    }

    public Customer(String name, String password, String address, int phone){
        user = new User(name, password, address, phone, UserType.CUSTOMER);
    }


    public User getUser(){
        return user;
    }

    public long getId(){
        return id;
    }

    public String getUserName(){
        return this.user.getUserName();
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Customer)) return false;
        Customer customer = (Customer) o;
        return id == customer.getId() &&
                user.getPhone() == customer.getUser().getPhone() &&
                user.getUserName().equals(customer.getUser().getUserName()) &&
                Objects.equals(user.getAddress(), customer.getUser().getAddress());
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user.getUserName(), user.getPassword(), user.getAddress(), user.getPhone());
    }
}
