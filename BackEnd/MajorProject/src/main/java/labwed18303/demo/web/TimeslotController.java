package labwed18303.demo.web;

import labwed18303.demo.model.Timeslot;
import labwed18303.demo.services.TimeslotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/timeslot")
public class TimeslotController {

    @Autowired
    private TimeslotService timeslotService;

    @PostMapping("")
    public ResponseEntity<Timeslot> createNewTimeslot(@RequestBody Timeslot timeslot){

        Timeslot timeslot1 = timeslotService.saveOrUpdateTimeslot(timeslot);
        return new ResponseEntity<Timeslot>(timeslot1, HttpStatus.CREATED);
    }

    @GetMapping("/{timeslotId}")
    public ResponseEntity<?> getTimeslotById(@PathVariable Long timeslotId){

        Timeslot timeslot = timeslotService.findByID(timeslotId);

        return new ResponseEntity<Timeslot>(timeslot, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Timeslot> getAllTimeslot(){return timeslotService.findAllTimeslots();}

    @DeleteMapping("/{timeslotId}")
    public ResponseEntity<?> deleteTimeslot(@PathVariable long timeslotId){
        timeslotService.deleteTimeslotByIdentifier(timeslotId);

        return new ResponseEntity<String>("Timeslot with ID: '"+timeslotId+"' was deleted", HttpStatus.OK);
    }
}
