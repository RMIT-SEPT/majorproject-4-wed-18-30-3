package labwed18303.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.util.*;


@Entity
public class Worker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long id;

    private String userName;


    @NonNull
    private String companyName;

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

    public Worker(User user){
        this.user = user;
    }

    public Worker(String userName, String password, String address, int phone, Set<ServiceProvided> services, String companyName){
        this.user = new User(userName, password, address, phone, UserType.WORKER);
        this.services = services;
        this.companyName = companyName;
    }

    public Worker(String userName, String password, String address, int phone, String companyName){
        this.user = new User(userName, password, address, phone, UserType.WORKER);
        this.companyName = companyName;
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

    @NonNull
    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(@NonNull String companyName) {
        this.companyName = companyName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Worker)) return false;
        Worker worker = (Worker) o;
        return id == worker.getId() &&
                user.equals(worker.getUser()) &&
                companyName.equals(worker.getCompanyName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, companyName);
    }
}


