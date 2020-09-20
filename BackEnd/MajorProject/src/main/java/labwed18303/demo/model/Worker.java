package labwed18303.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.*;


@Entity
public class Worker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long id;

    @OneToOne(
            cascade = CascadeType.ALL
    )
    private User user;


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

    public Worker() {
    }

    public User getUser(){
        return user;
    }


    public Worker(String userName, String password, String address, int phone) {
        user = new User(userName, password, address, phone, UserType.WORKER);

    }

    public Worker(long id, String userName, String password, String address, int phone, Set<ServiceProvided> services) {
        this.id = id;
        user = new User(userName, password, address, phone, UserType.WORKER);

        this.services = services;
    }
    public Worker(long id, String userName, String password, String address, int phone) {
        this.id = id;
        user = new User(userName, password, address, phone, UserType.WORKER);

        this.services = services;
    }

    public Worker(@JsonProperty("id") String id){
        this.id = Integer.parseInt(id);
    }

    public long getId() {
        return id;
    }
//
//    public String getUserName() {
//        return userName;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public String getAddress() {
//        return address;
//    }
//
//    public int getPhone() {
//        return phone;
//    }

    public Set<ServiceProvided> getServices() {
        return services;
    }

    public void setServices(Set<ServiceProvided> services) {
        this.services = services;
    }

//    @Override
//    public String toString() {
//        return "Worker{" +
//                "id=" + id +
//                ", userName='" + userName + '\'' +
//                ", password='" + password + '\'' +
//                ", address='" + address + '\'' +
//                ", phone=" + phone +
//                ", services=" + services +
//                '}';
//    }
//
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (!(o instanceof Worker)) return false;
//        Worker worker = (Worker) o;
//        return id == worker.getId() &&
//                phone == worker.getPhone() &&
//                userName.equals(worker.getUserName()) &&
//                address.equals(worker.getAddress());
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(id, userName, address, phone);
//    }
}
