package labwed18303.demo.services;

import labwed18303.demo.Repositories.TimeslotRepository;
import labwed18303.demo.exceptions.TimeslotException;
import labwed18303.demo.model.Timeslot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;


@Service
public class TimeslotService {
    @Autowired
    private TimeslotRepository timeslotRepository;

//    Each timeslot must have a unique Date (currently, this could be a different second, admittedly).
//    Attempting to add a timeslot with a matching date will return the existing timeslot (not error).
    public Timeslot saveOrUpdateTimeslot(Timeslot timeslot) {
        if(timeslot.getDate() == null){
            throw new TimeslotException("Timeslot must have a date");
        }
        if(timeslot.getDuration() < 1){
            throw new TimeslotException("Timeslot must have duration");
        }
        Timeslot existing = timeslotRepository.findByDate(timeslot.getDate());
        if(existing != null){
            timeslot.setDuration(existing.getDuration());
            timeslot.setId(existing.getId());
        }
        return timeslotRepository.save(timeslot);
    }

    public Timeslot findByID(Long timeslotId){

        Timeslot timeslot = timeslotRepository.findByid(timeslotId);

        if(timeslot == null){
            throw new TimeslotException("Timeslot ID '"+timeslotId+"' does not exist");
        }

        return timeslot;
    }
    public Timeslot findByDate(Date timeslotDate){

        Timeslot timeslot = timeslotRepository.findByDate(timeslotDate);

        if(timeslot == null){
            throw new TimeslotException("Timeslot with Date: '"+timeslotDate+"' does not exist");
        }

        return timeslot;
    }

    public Iterable<Timeslot> findAllTimeslots(){
        return timeslotRepository.findAll();
    }


    public void deleteTimeslotByIdentifier(Long timeslotId){
        Timeslot timeslot = timeslotRepository.findByid(timeslotId);

        if(timeslot == null){
            throw  new TimeslotException("Cannot Person with ID '"+timeslotId+"'. This person does not exist");
        }

        timeslotRepository.delete(timeslot);
    }
}
