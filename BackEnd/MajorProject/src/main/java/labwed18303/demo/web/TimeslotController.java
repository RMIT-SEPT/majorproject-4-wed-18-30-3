package labwed18303.demo.web;

import labwed18303.demo.model.ServiceProvided;
import labwed18303.demo.model.Timeslot;
import labwed18303.demo.model.User;
import labwed18303.demo.payload.AuthorizationErrorResponse;
import labwed18303.demo.security.JwtTokenProvider;
import labwed18303.demo.services.MapValidationErrorService;
import labwed18303.demo.services.TimeslotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.BindingResult;

import java.util.Date;

import static labwed18303.demo.security.SecurityConstants.HEADER_STRING;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/timeslot")
public class TimeslotController {

    @Autowired
    private TimeslotService timeslotService;

    @Autowired
    private JwtTokenProvider tokenProvider;

//    Each timeslot must have a unique Date (currently, this could be a different second, admittedly).
//    Attempting to add a timeslot with a matching date will return the existing timeslot (not error).
    @PostMapping("")
    public ResponseEntity<?> createNewTimeslot(@RequestHeader(HEADER_STRING) String auth, @RequestBody Timeslot timeslot){
        ResponseEntity<?> toReturn = null;
        User authUser = tokenProvider.getUserFromHeader(auth);
        if(authUser == null || authUser.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN")) == false){
            AuthorizationErrorResponse error = new AuthorizationErrorResponse("Do not have permission");
            toReturn = new ResponseEntity(error, HttpStatus.valueOf(401));
        }
        else{
            Timeslot timeslot1 = timeslotService.saveOrUpdateTimeslot(timeslot);
            toReturn = new ResponseEntity<>(timeslot1, HttpStatus.CREATED);
        }
        return toReturn;
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

    @GetMapping("")
    public Iterable<Timeslot> getAllTimeslot(){return timeslotService.findAllTimeslots();}

    @DeleteMapping("/{timeslotId}")
    public ResponseEntity<?> deleteTimeslot(@RequestHeader(HEADER_STRING) String auth, @PathVariable long timeslotId){
        ResponseEntity<?> toReturn = null;
        User authUser = tokenProvider.getUserFromHeader(auth);
        if(authUser == null || authUser.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN")) == false){
            AuthorizationErrorResponse error = new AuthorizationErrorResponse("Do not have permission");
            toReturn = new ResponseEntity(error, HttpStatus.valueOf(401));
        }
        else{
            timeslotService.deleteTimeslotByIdentifier(timeslotId);
            toReturn = new ResponseEntity<String>("Timeslot with ID: '"+timeslotId+"' was deleted", HttpStatus.OK);
        }
        return toReturn;
    }
}
