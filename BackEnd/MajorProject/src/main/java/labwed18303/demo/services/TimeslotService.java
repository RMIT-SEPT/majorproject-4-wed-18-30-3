package labwed18303.demo.services;

import labwed18303.demo.Repositories.TimeslotRepository;
import labwed18303.demo.model.Timeslot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class TimeslotService {
    @Autowired
    private TimeslotRepository timeslotRepository;

    public Timeslot saveOrUpdateTimeslot(Timeslot timeslot) {
        return timeslotRepository.save(timeslot);
    }

    public Timeslot findByID(Long timeslotId){

        Timeslot timeslot = timeslotRepository.findByid(timeslotId);

        if(timeslot == null){
            //throw new TimeslotException("Timeslot ID '"+timeslotId+"' does not exist");
        }

        return timeslot;
    }

    public Iterable<Timeslot> findAllTimeslots(){
        return timeslotRepository.findAll();
    }


    public void deleteTimeslotByIdentifier(Long timeslotId){
        Timeslot timeslot = timeslotRepository.findByid(timeslotId);

        if(timeslot == null){
            //throw  new  TimeslotException("Cannot Person with ID '"+timeslotId+"'. This person does not exist");
        }

        timeslotRepository.delete(timeslot);
    }
}
