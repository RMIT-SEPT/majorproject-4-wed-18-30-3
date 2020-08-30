package labwed18303.demo.model;



import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
public class Timeslot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JsonFormat(pattern = "yyyy-mm-dd-hh-mm")
    Date date;
    int duration;
    @JsonFormat(pattern = "yyyy-mm-dd")
    Date created_At;
    @JsonFormat(pattern = "yyyy-mm-dd")
    Date updated_At;

    public Timeslot(){

    }
    public Timeslot(long id, int duration, Date date, Date created_At, Date updated_At){
        this.id = id;
        this.duration = duration;
        this.date = date;
        this.created_At = created_At;
        this.updated_At = updated_At;
    }

    @Override
    public boolean equals(Object other){
        boolean toReturn = false;
        if(other instanceof Timeslot){
            toReturn = this.equals((Timeslot)other);
        }
        return toReturn;
    }


    public boolean equals(Timeslot other){
        boolean toReturn = false;
        if ((this.date != null && other.getDate().equals(this.date) || this.date == null && other.getDate() == null)
                && other.getId()==this.id && this.duration == other.getDuration()){
            toReturn = true;
        }
        return toReturn;
    }

    public Date getDate() {
        return date;
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
