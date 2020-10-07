package labwed18303.demo.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.lang.NonNull;


import javax.persistence.*;
import java.util.*;

@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JsonFormat(pattern = "yyyy-MM-dd-HH-mm-ss", timezone = "Australia/Sydney")
    Date created_At;

    @JsonFormat(pattern = "yyyy-MM-dd-HH-mm-ss", timezone = "Australia/Sydney")
    Date updated_At;

    @ManyToOne
    @JoinColumn(name = "worker_id")
    @JsonIgnoreProperties("bookings")
    @NonNull
    Worker worker;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    @JsonIgnoreProperties("bookings")
    Customer customer;

    @ManyToOne
    @JoinColumn(name= "service_id")
    ServiceProvided service;

    @NonNull
    @ManyToOne
    @JoinTable(
            name = "booking_timeslots",
            joinColumns = @JoinColumn(name = "booking_id"),
            inverseJoinColumns = @JoinColumn(name = "timeslot_id")
    )
    @JsonIgnoreProperties("bookings")
    Timeslot timeslot;
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
        this.timeslot = timeslot;
    }


    public Booking(long id, Date created_At, Date updated_At, Worker worker, Timeslot timeslot, Customer customer, ServiceProvided service) {
        this.id = id;
        this.created_At = created_At;
        this.updated_At = updated_At;
        this.worker = worker;
        this.timeslot = timeslot;
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
                ", timeslot=" + timeslot +
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
                if (Objects.equals(worker, other.getWorker()) &&
                        ((service == null && other.getService() == null) || (service != null && service.equals(other.getService())))
                        && ((customer == null && other.getCustomer() ==null) || (customer != null && Objects.equals(customer, other.getCustomer())))
                        && ((timeslot == null && other.getTimeslot() == null) || (timeslot != null && timeslot.equals(other.getTimeslot())))) {
                    toReturn = true;
                    }
                }
            }

        return toReturn;
    }

    @Override
    public int hashCode() {
        return Objects.hash(worker, timeslot);
    }
}
