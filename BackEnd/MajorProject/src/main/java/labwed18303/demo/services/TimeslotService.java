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
}
