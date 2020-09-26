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

    private String userName;

    @OneToOne(
            cascade = CascadeType.ALL
            //mappedBy = "customer"

    )
    @JsonIgnoreProperties("customer")
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

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Customer)) return false;
        Customer customer = (Customer) o;
        return id == customer.getId() &&
                user.equals(customer.getUser());
    }

    @Override
    public int hashCode() {
        return Objects.hash(user);
    }
}
