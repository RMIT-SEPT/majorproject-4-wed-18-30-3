package labwed18303.demo.model;


import javax.persistence.*;

import labwed18303.demo.model.Worker;


@Entity
public class CancelBooking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String reason;

    private String workerName;

    private String customerName;

    private long bookingReference;

    public void setId(long id) {
        this.id = id;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public void setWorkerName(String workerName) {
        this.workerName = workerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }


    public long getId() {
        return id;
    }

    public String getReason() {
        return reason;
    }

    public String getWorkerName() {
        return workerName;
    }

    public String getCustomerName() {
        return customerName;
    }

    public long getBookingReference() {
        return bookingReference;
    }
}
