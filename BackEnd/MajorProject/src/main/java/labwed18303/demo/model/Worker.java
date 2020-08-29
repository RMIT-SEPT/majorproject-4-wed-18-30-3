package labwed18303.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.tomcat.util.json.JSONParser;

import javax.persistence.*;


@Entity

public class Worker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long id;
    private String userName;
    private String password;
    private String address;
    private int phone;

    public Worker() {
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
}
