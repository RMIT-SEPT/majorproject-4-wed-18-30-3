package labwed18303.demo.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JsonFormat(pattern = "yyyy-mm-dd")
    Date created_At;
    @JsonFormat(pattern = "yyyy-mm-dd")
    Date updated_At;
    @ManyToOne
    Worker worker;
    @ManyToOne
    Timeslot timeslot;
    //Need array of timeslots, possibly.

    public Booking(){

    }

    public Booking(long id, Date created_At, Date updated_At, Worker worker, Timeslot timeslot) {
        this.id = id;
        this.created_At = created_At;
        this.updated_At = updated_At;
        this.worker = worker;
        this.timeslot = timeslot;
    }

    public Worker getWorker() {
        return worker;
    }

    public void setWorker(Worker worker) {
        this.worker = worker;
    }

    public Timeslot getTimeslot() {
        return timeslot;
    }

    public void setTimeslot(Timeslot timeslot) {
        this.timeslot = timeslot;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getCreated_At() {
        return created_At;
    }

    public void setCreated_At(Date created_At) {
        this.created_At = created_At;
    }

    public Date getUpdated_At() {
        return updated_At;
    }

    public void setUpdated_At(Date updated_At) {
        this.updated_At = updated_At;
    }

    @Override
    public String toString() {
        return "Booking{" +
                "id=" + id +
                ", created_At=" + created_At +
                ", updated_At=" + updated_At +
                ", worker=" + worker +
                ", timeslot=" + timeslot +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Booking)) return false;
        Booking booking = (Booking) o;
        return id == booking.getId() &&
                Objects.equals(worker, booking.getWorker()) &&
                timeslot.equals(booking.getTimeslot());
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, worker, timeslot);
    }
}
