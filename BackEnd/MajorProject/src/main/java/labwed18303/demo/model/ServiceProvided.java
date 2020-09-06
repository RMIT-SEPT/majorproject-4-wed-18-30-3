package labwed18303.demo.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class ServiceProvided {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    String name;
    int minDuration;

    public ServiceProvided(){

    }

    public ServiceProvided(long id, String name, int minDuration) {
        this.id = id;
        this.name = name;
        this.minDuration = minDuration;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getMinDuration() {
        return minDuration;
    }

    public void setMinDuration(int minDuration) {
        this.minDuration = minDuration;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ServiceProvided)) return false;
        ServiceProvided that = (ServiceProvided) o;
        return id == that.getId() &&
                minDuration == that.getMinDuration() &&
                name.equals(that.getName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, minDuration);
    }
}
