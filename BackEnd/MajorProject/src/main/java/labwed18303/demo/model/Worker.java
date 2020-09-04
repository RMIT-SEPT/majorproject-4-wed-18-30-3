package labwed18303.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.tomcat.util.json.JSONParser;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@Entity

public class Worker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long id;
    private String userName;
    private String password;
    private String address;
    private int phone;

    @OneToMany(
            mappedBy = "worker",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Booking> bookings = new ArrayList<Booking>();

    public Worker() {
    }

    public Worker(long id, String userName, String password, String address, int phone) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.address = address;
        this.phone = phone;
    }

    public Worker(@JsonProperty("id") String id){
        this.id = Integer.parseInt(id);
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

    @Override
    public String toString() {
        return "Worker{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                ", address='" + address + '\'' +
                ", phone=" + phone +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Worker)) return false;
        Worker worker = (Worker) o;
        return id == worker.getId() &&
                phone == worker.getPhone() &&
                userName.equals(worker.getUserName()) &&
                address.equals(worker.getAddress());
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userName, address, phone);
    }
}
