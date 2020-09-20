package labwed18303.demo.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
public class Timeslot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JsonFormat(pattern = "yyyy-MM-dd-HH-mm-ss")
    private Date date;
    private int duration;
    @JsonFormat(pattern = "yyyy-MM-dd-HH-mm-ss")
    private Date created_At;
    @JsonFormat(pattern = "yyyy-MM-dd-HH-mm-ss")
    private Date updated_At;

    @ManyToMany(
                    mappedBy = "timeslot"
            )
    @JsonIgnoreProperties("timeslot")
    private List<Booking> bookings = new ArrayList<>();

    public Timeslot(){

    }

    public Timeslot(long id){
        this.id = id;
    }

    public Timeslot(long id, int duration, Date date, Date created_At, Date updated_At){
        this.id = id;
        this.duration = duration;
        this.date = date;
        this.created_At = created_At;
        this.updated_At = updated_At;
    }

    public Timeslot(long id, int duration, Date date, Date created_At, Date updated_At, List<Booking> bookings){
        this.id = id;
        this.duration = duration;
        this.date = date;
        this.created_At = created_At;
        this.updated_At = updated_At;
        this.bookings = bookings;
    }

    @Override
    public boolean equals(Object other){
        boolean toReturn = false;
        if(other instanceof Timeslot){
            toReturn = this.equals((Timeslot)other);
        }
        return toReturn;
    }

    //&& this.date.equals(other.getDate())

    public boolean equals(Timeslot other){
        boolean toReturn = false;
        if(other !=null) {
            if (((this.compareDate(other.getDate())) || (this.date == null && other.getDate() == null)) && other.getId() == this.id && this.duration == other.getDuration()) {
                toReturn = true;
            }
        }
        return toReturn;
    }

    public Date getDate() {
        return date;
    }

    public List<Booking> getBookings(){
        return this.bookings;
    }
    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }

    public boolean compareDate(Date other){
        boolean toReturn = false;
        if(this.date != null && other != null){
            if(this.date.getYear()==other.getYear()
                    && this.date.getMonth() == other.getMonth()
                    && this.date.getDay() == other.getDay()
                    && this.date.getHours() == other.getHours()
                    && this.date.getMinutes() == other.getMinutes()){
                toReturn = true;
            }
        }
        return toReturn;
    }

    public boolean addBooking(Booking booking){
        boolean added=false;
        if(booking != null){
            if(this.bookings == null){
                this.bookings = new ArrayList<>();
            }
            this.bookings.add(booking);
            added = true;
        }
        return added;
    }


    public void setDate(Date date) {
        this.date = date;
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

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    @Override
    public String toString() {
        return "Timeslot{" +
                "id=" + id +
                ", date=" + date +
                ", duration=" + duration +
                ", created_At=" + created_At +
                ", updated_At=" + updated_At +
                '}';
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, date, duration);
    }


}
