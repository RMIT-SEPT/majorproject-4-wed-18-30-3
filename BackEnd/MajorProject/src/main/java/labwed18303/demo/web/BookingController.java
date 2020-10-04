package labwed18303.demo.web;

import labwed18303.demo.model.Booking;
import labwed18303.demo.model.User;
import labwed18303.demo.payload.AuthorizationErrorResponse;
import labwed18303.demo.security.JwtTokenProvider;
import labwed18303.demo.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;

import static labwed18303.demo.security.SecurityConstants.HEADER_STRING;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/booking")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private JwtTokenProvider tokenProvider;

//    Must have a valid timeslot.
//    Must have a valid worker.
//    Can add a booking with no Customer or Service. I.e. A worker availability.
//    If the booking has a customer, it must have a valid service. -> The service must exist and be a service the associated worker provides.
//    The booking's timeslot date must be in the future.
    @PostMapping("")
    public ResponseEntity<?> createNewBooking(@RequestHeader(HEADER_STRING) String auth, @RequestBody Booking booking)
    {
        ResponseEntity<?> toReturn = null;
        User authUser = tokenProvider.getUserFromHeader(auth);
        if(booking.getCustomer() == null) {
            if (authUser == null || booking.getWorker() == null || booking.getWorker().getUser() == null || booking.getWorker().getUser().getUserName() == null ||
                    (booking.getWorker().getUser().getUserName().compareTo(authUser.getUserName()) != 0 && authUser.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN")) == false)) {
                AuthorizationErrorResponse error = new AuthorizationErrorResponse("Do not have permission");
                toReturn = new ResponseEntity(error, HttpStatus.valueOf(401));
            } else {
                Booking booking1 = bookingService.saveOrUpdateBooking(booking);
                toReturn = new ResponseEntity<>(booking1, HttpStatus.ACCEPTED);
            }
        }
        else{
            if (authUser == null || booking.getCustomer() == null || booking.getCustomer().getUser() == null || booking.getCustomer().getUser().getUserName() == null ||
                    (booking.getCustomer().getUser().getUserName().compareTo(authUser.getUserName()) != 0 && authUser.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN")) == false)) {
                AuthorizationErrorResponse error = new AuthorizationErrorResponse("Do not have permission");
                toReturn = new ResponseEntity(error, HttpStatus.valueOf(401));
            } else {
                Booking booking1 = bookingService.saveOrUpdateBooking(booking);
                toReturn = new ResponseEntity<>(booking1, HttpStatus.ACCEPTED);
            }
        }
        return toReturn;
    }
    @GetMapping("/{bookingId}")
    public ResponseEntity<?> getBookingById(@RequestHeader(HEADER_STRING) String auth, @PathVariable Long bookingId){
        ResponseEntity<?> toReturn = null;

        Booking booking = bookingService.findByBookingIdentifier(bookingId);
        User authUser = tokenProvider.getUserFromHeader(auth);

        if(booking.getCustomer() == null) {
            toReturn = new ResponseEntity<>(booking, HttpStatus.OK);
        }
        else{
            if (authUser == null || (booking.getCustomer() == null || booking.getCustomer().getUser() == null || booking.getCustomer().getUser().getUserName() == null ||
                    (booking.getCustomer().getUser().getUserName().compareTo(authUser.getUserName()) != 0 && authUser.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN")) == false))
                    && (booking.getWorker() == null || booking.getWorker().getUser() == null || booking.getWorker().getUser().getUserName() == null ||
                    (booking.getWorker().getUser().getUserName().compareTo(authUser.getUserName()) != 0 && authUser.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN")) == false))) {
                AuthorizationErrorResponse error = new AuthorizationErrorResponse("Do not have permission");
                toReturn = new ResponseEntity(error, HttpStatus.valueOf(401));
            } else {
                toReturn = new ResponseEntity<>(booking, HttpStatus.OK);
            }
        }
        return toReturn;
    }

    @GetMapping("/search")
    public ResponseEntity<?> getBookingByTimeslotWorker(@RequestHeader(HEADER_STRING) String auth, @RequestBody Booking booking){
        ResponseEntity<?> toReturn = null;

        User authUser = tokenProvider.getUserFromHeader(auth);
        Booking foundBooking = bookingService.findByTimeslotWorker(booking);
        if(booking.getCustomer() == null) {
            toReturn = new ResponseEntity<>(foundBooking, HttpStatus.OK);
        }
        else{
            if (authUser == null || (booking.getCustomer() == null || booking.getCustomer().getUser() == null || booking.getCustomer().getUser().getUserName() == null ||
                    (booking.getCustomer().getUser().getUserName().compareTo(authUser.getUserName()) != 0 && authUser.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN")) == false))
                    && (booking.getWorker() == null || booking.getWorker().getUser() == null || booking.getWorker().getUser().getUserName() == null ||
                    (booking.getWorker().getUser().getUserName().compareTo(authUser.getUserName()) != 0 && authUser.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN")) == false))) {
                AuthorizationErrorResponse error = new AuthorizationErrorResponse("Do not have permission");
                toReturn = new ResponseEntity(error, HttpStatus.valueOf(401));
            } else {
                toReturn = new ResponseEntity<>(foundBooking, HttpStatus.OK);
            }
        }
        return toReturn;
    }

    @GetMapping("")
    public ResponseEntity<?> getAllBookings(@RequestHeader(HEADER_STRING) String auth){
        ResponseEntity<?> toReturn = null;
        User authUser = tokenProvider.getUserFromHeader(auth);
        if(authUser == null){
            AuthorizationErrorResponse error = new AuthorizationErrorResponse("Do not have permission");
            toReturn = new ResponseEntity(error, HttpStatus.valueOf(401));
        }
        else if(authUser.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN")) == false){
            toReturn = new ResponseEntity<>(bookingService.findAllBookingsWithoutCustomers(), HttpStatus.OK);
        }
        else{
            toReturn = new ResponseEntity<>(bookingService.findAllBookings(), HttpStatus.OK);
        }

        return toReturn;
    }

//    If the booking has no customer, it can be removed.
//    If it has a customer, i.e. "Cancelling", it cannot be removed if it is less than 48 hours from the booking date.
    @DeleteMapping("/{bookingId}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long bookingId){
        bookingService.deleteBookingByIdentifier(bookingId);

        return new ResponseEntity<String>("Booking with ID: '"+bookingId+"' was deleted", HttpStatus.OK);
    }
}