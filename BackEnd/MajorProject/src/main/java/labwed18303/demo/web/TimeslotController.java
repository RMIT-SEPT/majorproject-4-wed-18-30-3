package labwed18303.demo.web;

import labwed18303.demo.model.Timeslot;
import labwed18303.demo.services.TimeslotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/timeslot")
public class TimeslotController {

    @Autowired
    private TimeslotService timeslotService;

    @PostMapping("")
    public ResponseEntity<Timeslot> createNewTimeslot(@RequestBody Timeslot timeslot){

        Timeslot timeslot1 = timeslotService.saveOrUpdateTimeslot(timeslot);
        return new ResponseEntity<Timeslot>(timeslot, HttpStatus.CREATED);
    }

}
