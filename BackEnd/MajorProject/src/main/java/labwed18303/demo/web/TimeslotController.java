package labwed18303.demo.web;

import labwed18303.demo.model.Timeslot;
import labwed18303.demo.services.TimeslotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/timeslot")
public class TimeslotController {

    @Autowired
    private TimeslotService timeslotService;

//    Each timeslot must have a unique Date (currently, this could be a different second, admittedly).
//    Attempting to add a timeslot with a matching date will return the existing timeslot (not error).
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

    @GetMapping("/date/{timeslotDate}")
    public ResponseEntity<?> getTimeslotByDate(@PathVariable Date timeslotDate){

        Timeslot timeslot = timeslotService.findByDate(timeslotDate);

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