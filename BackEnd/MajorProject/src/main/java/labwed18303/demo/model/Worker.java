package labwed18303.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.*;


@Entity
public class Worker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long id;

    private String userName;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "worker_services",
            joinColumns = @JoinColumn(name = "worker_id"),
            inverseJoinColumns = @JoinColumn(name = "service_provided_id")
    )
    private Set<ServiceProvided> services = new HashSet<>();

    @OneToMany(
            mappedBy = "worker",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Booking> bookings = new ArrayList<Booking>();

    @OneToOne(
            cascade = CascadeType.ALL
            //mappedBy = "worker"

    )
    @JsonIgnoreProperties("worker")

    private User user;


    public Worker() {
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public long getId() {
        return id;
    }

    public Set<ServiceProvided> getServices() {
        return services;
    }

    public void setServices(Set<ServiceProvided> services) {
        this.services = services;
    }
}


