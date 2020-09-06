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

    public Timeslot saveOrUpdateTimeslot(Timeslot timeslot) {
        if(timeslot.getDate() == null){
            throw new TimeslotException("Timeslot must have a date");
        }
        if(timeslot.getDuration() < 1){
            throw new TimeslotException("Timeslot must have duration");
        }
        for(Timeslot currentTimeslots : timeslotRepository.findAll()){
            if(timeslot.getDate().equals(currentTimeslots.getDate())){
                throw new TimeslotException("A timeslot at that Date already exists");
            }
        }
        if(timeslotRepository.findByDate(timeslot.getDate()) != null && timeslot.getDuration() != timeslotRepository.findByDate(timeslot.getDate()).getDuration()){
            timeslot.setDuration(timeslotRepository.findByDate(timeslot.getDate()).getDuration());
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
