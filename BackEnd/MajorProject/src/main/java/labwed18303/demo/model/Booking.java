package labwed18303.demo.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JsonFormat(pattern = "yyyy-MM-dd-HH-mm-ss")
    Date created_At;
    @JsonFormat(pattern = "yyyy-MM-dd-HH-mm-ss")
    Date updated_At;
    @ManyToOne
    @JoinColumn(name = "worker_id")
    @JsonIgnoreProperties("bookings")
    Worker worker;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    @JsonIgnoreProperties("bookings")
    Customer customer;

    @ManyToOne
    @JoinColumn(name= "service_id")
    ServiceProvided service;

    @ManyToMany
    @JoinTable(
            name = "booking_timeslots",
            joinColumns = @JoinColumn(name = "booking_id"),
            inverseJoinColumns = @JoinColumn(name = "timeslot_id")
    )
    @JsonIgnoreProperties("bookings")
    List<Timeslot> timeslots = new ArrayList<>();
    //Need array of timeslots, possibly.

    public Booking(){

    }

    public Booking(long id, Date created_At, Date updated_At) {
        this.id = id;
        this.created_At = created_At;
        this.updated_At = updated_At;
    }

    public Booking(long id, Date created_At, Date updated_At, Worker worker) {
        this.id = id;
        this.created_At = created_At;
        this.updated_At = updated_At;
        this.worker = worker;
    }

    public Booking(long id, Date created_At, Date updated_At, Worker worker, Timeslot timeslot) {
        this.id = id;
        this.created_At = created_At;
        this.updated_At = updated_At;
        this.worker = worker;
        this.timeslots.add(timeslot);
    }

    public Booking(long id, Date created_At, Date updated_At, Worker worker, List<Timeslot> timeslots){
        this.id = id;
        this.created_At = created_At;
        this.updated_At = updated_At;
        this.worker = worker;
        this.timeslots = timeslots;
    }

    public Booking(long id, Date created_At, Date updated_At, Worker worker, Timeslot timeslot, Customer customer, ServiceProvided service) {
        this.id = id;
        this.created_At = created_At;
        this.updated_At = updated_At;
        this.worker = worker;
        this.timeslots.add(timeslot);
        this.customer = customer;
        this.service = service;
    }

    public Worker getWorker() {
        return worker;
    }

    public void setWorker(Worker worker) {
        this.worker = worker;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public List<Timeslot> getTimeslots() {
        return timeslots;
    }

    public void setTimeslots(List<Timeslot> timeslots) {
        this.timeslots = timeslots;
    }

    public void addTimeslot(Timeslot toAdd){
        this.timeslots.add(toAdd);
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

    public ServiceProvided getService() {
        return service;
    }

    public void setService(ServiceProvided service) {
        this.service = service;
    }

    @Override
    public String toString() {
        return "Booking{" +
                "id=" + id +
                ", created_At=" + created_At +
                ", updated_At=" + updated_At +
                ", worker=" + worker +
                ", customer=" + customer +
                ", service=" + service +
                ", timeslots=" + timeslots +
                '}';
    }

    @Override
    public boolean equals(Object otherObject) {
        boolean toReturn = false;
        if (this == otherObject){
            toReturn = true;
        }
        else {
            if ((otherObject instanceof Booking)) {
                Booking other = (Booking) otherObject;
                if (id == other.getId() &&
                        Objects.equals(worker, other.getWorker()) && service.equals(other.getService()) && Objects.equals(customer, other.getCustomer()) && timeslots.size() == other.getTimeslots().size()) {
                    toReturn = true;
                    for (int i = 0; i < timeslots.size() && toReturn ==true; ++i) {
                            toReturn = other.getTimeslots().contains(timeslots.get(i));
                        }
                    }
                }
            }

        return toReturn;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, worker, timeslots);
    }
}
